import { InputField } from '@evershop/evershop/components/common/form/InputField';
import { ToggleField } from '@evershop/evershop/components/common/form/ToggleField';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@evershop/evershop/components/common/ui/Card';
import React from 'react';

interface BoldPaymentProps {
  setting: {
    boldPaymentStatus: true | false | 0 | 1;
    boldDisplayName: string;
    boldApiKey: string;
    boldSecretKey: string;
    boldButtonStyle: string;
  };
}

export default function BoldPayment({
  setting: {
    boldPaymentStatus,
    boldDisplayName,
    boldApiKey,
    boldSecretKey,
    boldButtonStyle
  }
}: BoldPaymentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bold por redirección</CardTitle>
        <CardDescription>
          Configura el botón de pagos de Bold para Colombia. Esta base crea la
          orden en EverShop y luego redirige al comprador a la pasarela de
          Bold.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-1 flex items-center">
            <h4>¿Activar Bold?</h4>
          </div>
          <div className="col-span-2 flex justify-start">
            <ToggleField
              name="boldPaymentStatus"
              defaultValue={boldPaymentStatus}
              trueValue={1}
              falseValue={0}
            />
          </div>
        </div>
      </CardContent>
      <CardContent className="border-t border-border pt-4">
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-1 flex items-center">
            <h4>Nombre visible</h4>
          </div>
          <div className="col-span-2">
            <InputField
              name="boldDisplayName"
              placeholder="Paga con Bold"
              defaultValue={boldDisplayName}
            />
          </div>
        </div>
      </CardContent>
      <CardContent className="border-t border-border pt-4">
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-1">
            <h4>Llave pública</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Es la llave de identidad que Bold pide como <code>api-key</code>.
            </p>
          </div>
          <div className="col-span-2">
            <InputField
              name="boldApiKey"
              placeholder="Llave pública / identidad de Bold"
              defaultValue={boldApiKey}
            />
          </div>
        </div>
      </CardContent>
      <CardContent className="border-t border-border pt-4">
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-1">
            <h4>Llave de integridad</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Se usa solo en backend para generar la firma SHA-256 del botón.
            </p>
          </div>
          <div className="col-span-2">
            <InputField
              name="boldSecretKey"
              placeholder="Llave de integridad / secreta"
              defaultValue={boldSecretKey}
            />
          </div>
        </div>
      </CardContent>
      <CardContent className="border-t border-border pt-4">
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-1">
            <h4>Estilo del botón</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Usa valores como <code>dark-L</code>, <code>dark-M</code> o{' '}
              <code>light-L</code>.
            </p>
          </div>
          <div className="col-span-2">
            <InputField
              name="boldButtonStyle"
              placeholder="dark-L"
              defaultValue={boldButtonStyle || 'dark-L'}
            />
          </div>
        </div>
      </CardContent>
      <CardContent className="border-t border-border pt-4 text-sm leading-7 text-muted-foreground">
        Flujo previsto: el cliente finaliza checkout, EverShop crea la orden
        pendiente y luego abre la página de pago de Bold con monto definido. La
        validación final del pago debe cerrarse después con consulta de
        transacción y/o webhook.
      </CardContent>
    </Card>
  );
}

export const layout = {
  areaId: 'paymentSetting',
  sortOrder: 15
};

export const query = `
  query Query {
    setting {
      boldPaymentStatus
      boldDisplayName
      boldApiKey
      boldSecretKey
      boldButtonStyle
    }
  }
`;
