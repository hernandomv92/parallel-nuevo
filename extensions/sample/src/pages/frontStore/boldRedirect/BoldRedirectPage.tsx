import { Button } from '@evershop/evershop/components/common/ui/Button';
import React, { useEffect, useMemo, useRef, useState } from 'react';

interface BoldPayload {
  orderId: string;
  orderNumber: string;
  currency: string;
  amount: string;
  amountText: string;
  apiKey: string;
  integritySignature: string;
  redirectionUrl: string;
  description: string;
  buttonStyle: string;
  customerData?: string;
  billingAddress?: string;
  missingConfiguration?: string[];
}

interface BoldRedirectPageProps {
  order: {
    orderNumber: string;
    grandTotal: {
      text: string;
    };
  };
}

const BOLD_LIBRARY_URL = 'https://checkout.bold.co/library/boldPaymentButton.js';
const BOLD_SCRIPT_ID = 'bold-unified-script';
const MAX_RENDER_WAIT_MS = 10_000;

export default function BoldRedirectPage({ order }: BoldRedirectPageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payload, setPayload] = useState<BoldPayload | null>(null);
  const [scriptStatus, setScriptStatus] = useState<
    'idle' | 'injecting' | 'loaded' | 'rendered' | 'failed'
  >('idle');
  const [diagnosticMessages, setDiagnosticMessages] = useState<string[]>([]);

  const missingConfiguration = useMemo(() => {
    if (!payload?.missingConfiguration) {
      return [];
    }

    return payload.missingConfiguration;
  }, [payload]);

  // ──────────────────────────────────────────────
  // Step 1 — Fetch the internal Bold payload
  // ──────────────────────────────────────────────
  useEffect(() => {
    let active = true;

    async function fetchBoldPayload() {
      if (typeof window === 'undefined') {
        return;
      }

      const orderId = new URLSearchParams(window.location.search).get('order_id');

      if (!orderId) {
        setError('No se encontro el identificador de la orden para Bold.');
        setDiagnosticMessages([
          'La pagina de pago no recibio el parametro order_id en la URL.'
        ]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/bold/button-payload', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ order_id: orderId })
        });

        const result = await response.json().catch(() => null);

        if (!response.ok) {
          const message =
            result?.error?.message ||
            `Bold payload devolvio ${response.status} ${response.statusText}`;

          throw new Error(message);
        }

        if (!result?.data) {
          throw new Error('La API respondio sin payload para Bold.');
        }

        if (!active) {
          return;
        }

        setPayload(result.data as BoldPayload);
        setError(null);
        setLoading(false);
      } catch (err) {
        if (!active) {
          return;
        }

        const message =
          err instanceof Error ? err.message : 'No se pudo obtener el payload de Bold.';

        setError(message);
        setDiagnosticMessages([
          'La pagina no pudo obtener el payload interno de Bold.',
          'Verifica que la ruta POST /api/bold/button-payload exista y responda JSON.',
          `order_id consultado: ${orderId}`
        ]);
        setLoading(false);
      }
    }

    fetchBoldPayload();

    return () => {
      active = false;
    };
  }, []);

  // ──────────────────────────────────────────────
  // Step 2 — Inject a SINGLE unified Bold script
  //
  // Bold docs: "Si no puedes editar el head de tu
  // sitio web tienes la opción de incluir
  // src='...boldPaymentButton.js' entre los
  // atributos del script del botón de pagos."
  //
  // This eliminates timing issues in React/SPA
  // where the library loads before the data-*
  // script is in the DOM.
  // ──────────────────────────────────────────────
  useEffect(() => {
    if (!payload) {
      return;
    }

    if (missingConfiguration.length > 0) {
      return;
    }

    if (!containerRef.current) {
      return;
    }

    const container = containerRef.current;

    // Clean up previous attempts
    container.innerHTML = '';
    const existingScript = document.getElementById(BOLD_SCRIPT_ID);
    if (existingScript) {
      existingScript.remove();
    }

    setScriptStatus('injecting');
    setDiagnosticMessages([]);

    // ── Single unified script ──
    // Both the library src AND the data-* config in ONE tag
    const script = document.createElement('script');
    script.id = BOLD_SCRIPT_ID;
    script.src = BOLD_LIBRARY_URL;
    script.async = true;

    // Required attributes
    script.setAttribute('data-bold-button', payload.buttonStyle || 'dark-L');
    script.setAttribute('data-order-id', payload.orderId);
    script.setAttribute('data-currency', payload.currency);
    script.setAttribute('data-amount', payload.amount);
    script.setAttribute('data-api-key', payload.apiKey);
    script.setAttribute('data-integrity-signature', payload.integritySignature);
    script.setAttribute('data-redirection-url', payload.redirectionUrl);
    script.setAttribute('data-description', payload.description);

    // Optional attributes
    if (payload.customerData) {
      script.setAttribute('data-customer-data', payload.customerData);
    }

    if (payload.billingAddress) {
      script.setAttribute('data-billing-address', payload.billingAddress);
    }

    // ── MutationObserver: detect when Bold renders ──
    const observer = new MutationObserver(() => {
      // Bold either replaces the script with a button/iframe
      // or adds siblings next to it
      const rendered =
        container.querySelector('iframe') ||
        container.querySelector('button') ||
        container.querySelector('[class*="bold"]') ||
        container.querySelector('[id*="bold"]') ||
        container.childNodes.length > 1;

      if (rendered) {
        setScriptStatus('rendered');
        setLoading(false);
        observer.disconnect();
      }
    });

    observer.observe(container, { childList: true, subtree: true, attributes: true });

    // ── Fallback handlers ──
    script.onload = () => {
      setScriptStatus('loaded');
      setLoading(false);
    };

    script.onerror = () => {
      setScriptStatus('failed');
      setDiagnosticMessages([
        'No se pudo cargar la libreria remota de Bold.',
        'Verifica bloqueadores del navegador, red o politicas CSP.',
        `URL del script: ${BOLD_LIBRARY_URL}`
      ]);
      setLoading(false);
      observer.disconnect();
    };

    // Insert into the visible container (not head)
    container.appendChild(script);

    // Safety timeout — if nothing rendered after MAX_RENDER_WAIT_MS
    const timeout = window.setTimeout(() => {
      observer.disconnect();
      setLoading(false);

      // Only set failed if not already rendered
      setScriptStatus((current) => {
        if (current === 'rendered') {
          return current;
        }

        setDiagnosticMessages([
          'Bold cargo la libreria pero no renderizo el boton tras ' +
            (MAX_RENDER_WAIT_MS / 1000) +
            ' segundos.',
          'Revisa si la llave publica y la llave de integridad son del mismo ambiente (ambas sandbox o ambas produccion).',
          'Abre la consola del navegador y busca errores BTN-000, BTN-001, BTN-002 o BTN-004.',
          'Verifica que el monto sea un entero valido sin decimales (ej: 273000).',
          `order-id enviado: ${payload.orderId}`,
          `amount enviado: ${payload.amount}`,
          `redirection-url: ${payload.redirectionUrl}`
        ]);

        return 'failed';
      });
    }, MAX_RENDER_WAIT_MS);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
      script.onload = null;
      script.onerror = null;
    };
  }, [missingConfiguration.length, payload]);

  return (
    <div className="page-width py-10">
      <div className="mx-auto max-w-3xl rounded-[28px] border border-neutral-200 bg-white p-6 shadow-[0_16px_60px_rgba(0,0,0,0.06)] md:p-8">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-500">
          Pago con Bold
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-neutral-950">
          Finaliza tu pago seguro
        </h1>
        <p className="mt-4 max-w-[58ch] text-sm leading-7 text-neutral-600">
          Tu orden ya fue creada en Parallel Store. Ahora seras enviado a Bold para completar el
          pago con tarjeta, PSE u otros medios habilitados.
        </p>

        {order ? (
          <div className="mt-8 grid gap-4 rounded-[24px] bg-neutral-50 p-5 md:grid-cols-2">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-neutral-500">
                Orden
              </p>
              <p className="mt-2 text-xl font-black text-neutral-950">
                #{order.orderNumber}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-neutral-500">
                Total
              </p>
              <p className="mt-2 text-xl font-black text-neutral-950">
                {order.grandTotal.text}
              </p>
            </div>
          </div>
        ) : null}

        {loading ? (
          <div className="mt-8 rounded-[22px] border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-600">
            Preparando los datos de la transaccion para Bold...
          </div>
        ) : null}

        {error ? (
          <div className="mt-8 rounded-[22px] border border-red-200 bg-red-50 p-5 text-sm leading-7 text-red-700">
            {error}
            <div className="mt-3 text-xs leading-6">
              <p>
                order_id: <span className="font-mono">{payload?.orderId || 'vacío'}</span>
              </p>
              {diagnosticMessages.length > 0 ? (
                <ul className="mt-2 list-disc pl-5">
                  {diagnosticMessages.map((message) => (
                    <li key={message}>{message}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        ) : null}

        {missingConfiguration.length > 0 ? (
          <div className="mt-8 rounded-[22px] border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-800">
            El metodo de pago Bold no esta disponible en este momento. El equipo debe completar
            esta configuracion antes de habilitar la pasarela:
            <ul className="mt-3 list-disc pl-5">
              {missingConfiguration.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Container div is ALWAYS rendered so the ref is available
            when the script-injection useEffect runs. Hidden until ready. */}
        <div
          ref={containerRef}
          className="mt-8"
          style={{
            display:
              !loading && !error && missingConfiguration.length === 0
                ? undefined
                : 'none'
          }}
        />

        {!loading && !error && missingConfiguration.length === 0 ? (
          <div>
            {scriptStatus !== 'rendered' ? (
              <p className="mt-4 text-xs leading-6 text-neutral-500">
                Si el boton no aparece de inmediato, recarga esta pagina. El script de Bold se carga
                una vez la orden y la firma de integridad esten listas.
              </p>
            ) : null}
            <div className="mt-4 rounded-[18px] border border-neutral-200 bg-neutral-50 p-4 text-xs leading-6 text-neutral-600">
              <p>
                Estado del script:{' '}
                <span className="font-semibold text-neutral-950">{scriptStatus}</span>
              </p>
              <p>
                Retorno configurado:{' '}
                <span className="font-mono text-[11px]">{payload?.redirectionUrl || 'N/A'}</span>
              </p>
              {diagnosticMessages.length > 0 ? (
                <ul className="mt-2 list-disc pl-5">
                  {diagnosticMessages.map((message) => (
                    <li key={message}>{message}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <Button type="button" variant="outline" onClick={() => window.history.back()}>
            Volver
          </Button>
        </div>
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};

export const query = `
  query Query {
    order(uuid: getContextValue("boldOrderId")) {
      orderNumber
      grandTotal {
        text
      }
    }
  }
`;
