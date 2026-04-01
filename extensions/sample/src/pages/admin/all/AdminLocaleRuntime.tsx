import React from 'react';

const exactReplacements: Array<[string, string]> = [
  ['Quick links', 'Accesos rápidos'],
  ['Dashboard', 'Panel'],
  ['Setting', 'Configuración'],
  ['STORE SETTING', 'CONFIGURACIÓN DE TIENDA'],
  ['PAYMENT SETTING', 'CONFIGURACIÓN DE PAGOS'],
  ['SHIPPING SETTING', 'CONFIGURACIÓN DE ENVÍOS'],
  ['TAX SETTING', 'CONFIGURACIÓN DE IMPUESTOS'],
  ['New Product', 'Nuevo producto'],
  ['New Coupon', 'Nuevo cupón'],
  ['Products', 'Productos'],
  ['Categories', 'Categorías'],
  ['Collections', 'Colecciones'],
  ['Attributes', 'Atributos'],
  ['Orders', 'Pedidos'],
  ['Customers', 'Clientes'],
  ['Coupons', 'Cupones'],
  ['Pages', 'Páginas'],
  ['Widgets', 'Widgets'],
  ['SETTING', 'CONFIGURACIÓN'],
  ['Search', 'Buscar'],
  ['Create a new product', 'Crear un producto'],
  ['Create a new coupon', 'Crear un cupón'],
  ['General Information', 'Información general'],
  ['The general information about the coupon.', 'Información general del cupón.'],
  ['Manage the general information of the product.', 'Administra la información general del producto.'],
  ['Product Name', 'Nombre del producto'],
  ['Enter product name', 'Escribe el nombre del producto'],
  ['Enter SKU', 'Escribe el SKU'],
  ['Category', 'Categoría'],
  ['Select category', 'Seleccionar categoría'],
  ['Select Category', 'Seleccionar categoría'],
  ['Change', 'Cambiar'],
  ['Unassign', 'Quitar asignación'],
  ['Loading...', 'Cargando...'],
  ['There was an error fetching categories.', 'Hubo un error al cargar las categorías.'],
  ['Tax Class', 'Clase de impuesto'],
  ['Description', 'Descripción'],
  ['Price', 'Precio'],
  ['Product Status', 'Estado del producto'],
  ['Set the status and visibility of the product.', 'Define el estado y la visibilidad del producto.'],
  ['Status', 'Estado'],
  ['Enabled', 'Activo'],
  ['Disabled', 'Inactivo'],
  ['Visibility', 'Visibilidad'],
  ['Not visible individually', 'No visible de forma individual'],
  ['Catalog, Search', 'Catálogo, búsqueda'],
  ['Inventory', 'Inventario'],
  ['Manage the inventory settings of the product.', 'Administra la configuración de inventario del producto.'],
  ['Manage Stock', 'Gestionar stock'],
  ['Stock Availability', 'Disponibilidad de stock'],
  ['Quantity', 'Cantidad'],
  ['Shipping', 'Envío'],
  ['Manage the shipping settings of the product.', 'Administra la configuración de envío del producto.'],
  ['No shipping required?', '¿No requiere envío?'],
  ['Weight', 'Peso'],
  ['Enter weight', 'Escribe el peso'],
  ['Media', 'Multimedia'],
  ['Manage product images and gallery. Drag and drop to reorder images.', 'Administra imágenes y galería del producto. Arrastra para reordenarlas.'],
  ['SEO', 'SEO'],
  ['Manage the SEO settings.', 'Administra la configuración SEO.'],
  ['URL Key', 'URL'],
  ['Enter URL Key', 'Escribe la URL'],
  ['Meta Title', 'Título SEO'],
  ['Enter Meta Title', 'Escribe el título SEO'],
  ['Meta Description', 'Meta descripción'],
  ['Enter Meta Description', 'Escribe la meta descripción'],
  ['Attribute group', 'Grupo de atributos'],
  ['Manage the attributes.', 'Administra los atributos.'],
  ['Select an option', 'Selecciona una opción'],
  ['Coupon Code', 'Código del cupón'],
  ['Enter coupon code', 'Escribe el código del cupón'],
  ['Enter description', 'Escribe la descripción'],
  ['Discount amount', 'Monto del descuento'],
  ['Start date', 'Fecha de inicio'],
  ['End date', 'Fecha de fin'],
  ['Free shipping?', '¿Envío gratis?'],
  ['Discount Type', 'Tipo de descuento'],
  ['The type of discount applied by the coupon.', 'Tipo de descuento que aplicará el cupón.'],
  ['Fixed discount to entire order', 'Descuento fijo a toda la orden'],
  ['Percentage discount to entire order', 'Descuento porcentual a toda la orden'],
  ['Fixed discount to specific products', 'Descuento fijo a productos específicos'],
  ['Percentage discount to specific products', 'Descuento porcentual a productos específicos'],
  ['Buy X get Y', 'Compra X y lleva Y'],
  ['Order conditions', 'Condiciones del pedido'],
  ['The conditions related to the order for the coupon to be applied.', 'Condiciones del pedido para que el cupón aplique.'],
  ['Minimum purchase amount', 'Monto mínimo de compra'],
  ['Minimum purchase qty', 'Cantidad mínima de compra'],
  ['Minimum purchase quantity', 'Cantidad mínima de compra'],
  ['Customer conditions', 'Condiciones del cliente'],
  ['The conditions related to the customer for the coupon to be applied.', 'Condiciones del cliente para que el cupón aplique.'],
  ['Customer groups', 'Grupos de clientes'],
  ['Customer emails', 'Correos de clientes'],
  ['Enter customer emails', 'Escribe los correos de clientes'],
  ["Customer's purchase", 'Compra acumulada del cliente'],
  ['Save', 'Guardar'],
  ['Cancel', 'Cancelar'],
  ['Show', 'Mostrar'],
  ['Clear Filters', 'Limpiar filtros'],
  ['Clear filter', 'Limpiar filtro'],
  ['Clear filters', 'Limpiar filtros'],
  ['THUMBNAIL', 'MINIATURA'],
  ['NAME', 'NOMBRE'],
  ['PRICE', 'PRECIO'],
  ['STOCK', 'STOCK'],
  ['STATUS', 'ESTADO'],
  ['Active', 'Activo'],
  ['Product type', 'Tipo de producto'],
  ['Collection Name', 'Nombre de la colección'],
  ['Code', 'Código'],
  ['New Collection', 'Nueva colección'],
  ['ATTRIBUTE NAME', 'NOMBRE DEL ATRIBUTO'],
  ['GROUPS', 'GRUPOS'],
  ['TYPE', 'TIPO'],
  ['IS REQUIRED?', '¿ES OBLIGATORIO?'],
  ['IS FILTERABLE?', '¿SE PUEDE FILTRAR?'],
  ['New Attribute', 'Nuevo atributo'],
  ['New Page', 'Nueva página'],
  ['Cms Pages', 'Páginas CMS'],
  ['Sale Statistics', 'Estadísticas de ventas'],
  ['Overview of sales data over selected periods', 'Resumen de ventas por el período seleccionado'],
  ['Lifetime Sales', 'Ventas acumuladas'],
  ['Overview of total sales and order status over the lifetime of your store', 'Resumen de ventas totales y estado de pedidos de toda la tienda'],
  ['Daily', 'Diario'],
  ['Weekly', 'Semanal'],
  ['Monthly', 'Mensual'],
  ['Store Settings', 'Configuración de tienda'],
  ['Configure your store information', 'Configura la información de tu tienda'],
  ['Store Name', 'Nombre de la tienda'],
  ['Store Description', 'Descripción de la tienda'],
  ['Store Phone Number', 'Teléfono de la tienda'],
  ['Store Email', 'Correo de la tienda'],
  ['Contact Information', 'Información de contacto'],
  ['Address', 'Dirección'],
  ['Country', 'País'],
  ['Store Address', 'Dirección de la tienda'],
  ['City', 'Ciudad'],
  ['Province', 'Departamento'],
  ['Postal Code', 'Código postal'],
  ['Payment Setting', 'Configuración de pagos'],
  ['Configure the available payment methods', 'Configura los métodos de pago disponibles'],
  ['Shipping Setting', 'Configuración de envíos'],
  ['Where you ship, shipping methods and delivery fee', 'Define cobertura, métodos de envío y costos de entrega'],
  ['Tax Setting', 'Configuración de impuestos'],
  ['Configure tax classes and tax rates', 'Configura clases y tasas de impuestos'],
  ['Stripe Payment', 'Pago con Stripe'],
  ['Configure your Stripe payment gateway settings', 'Configura la pasarela de pago de Stripe'],
  ['Paypal Payment', 'Pago con PayPal'],
  ['Configure your Paypal payment gateway settings', 'Configura la pasarela de pago de PayPal'],
  ['Enable?', '¿Activar?'],
  ['Dislay Name', 'Nombre visible'],
  ['Publishable Key', 'Llave pública'],
  ['Secret Key', 'Llave secreta'],
  ['Webhook Secret Key', 'Llave secreta del webhook'],
  ['Payment mode', 'Modo de pago'],
  ['Authorize only', 'Solo autorizar'],
  ['Capture', 'Capturar'],
  ['Credit Card', 'Tarjeta de crédito'],
  ['Best Sellers', 'Más vendidos'],
  ['View All Products', 'Ver todos los productos'],
  ['A list of best selling products', 'Lista de productos más vendidos'],
  ['Look like you just started. No bestsellers yet.', 'Parece que estás comenzando. Aún no hay productos más vendidos.'],
  ['Overview of total sales and order status over the lifetime of your', 'Resumen de ventas totales y estado de pedidos de toda la tienda'],
  ['0 orders', '0 pedidos'],
  ['0% of orders completed', '0% de pedidos completados'],
  ['0% of orders cancelled', '0% de pedidos cancelados'],
  ['© 2022 Evershop. All Rights Reserved.', '© 2026 Paralel Store. Todos los derechos reservados.'],
  ['© 2025 Evershop. All Rights Reserved.', '© 2026 Paralel Store. Todos los derechos reservados.'],
  ['Version 2.1.1', ''],
  ['An Amazing EverShop Store', 'Paralel Store'],
  ['EverShop Store', 'Paralel Store'],
  ['Variant Group', 'Grupo de variantes'],
  ['Manage the variant group of the product.', 'Administra el grupo de variantes del producto.'],
  ['This product has some variants like color or size?', '¿Este producto tiene variantes como color o talla?'],
  ['Create a variant group', 'Crear grupo de variantes']
];

const inlineSpanishFixes: Array<[string, string]> = [
  ['Catalogo', 'Catálogo'],
  ['categorias', 'categorías'],
  ['Categorias', 'Categorías'],
  ['atribucion', 'atribución'],
  ['coleccion', 'colección'],
  ['colecciones', 'colecciones'],
  ['cupon', 'cupón'],
  ['cupones', 'cupones'],
  ['descripcion', 'descripción'],
  ['Descripcion', 'Descripción'],
  ['informacion', 'información'],
  ['Informacion', 'Información'],
  ['operacion', 'operación'],
  ['Operacion', 'Operación'],
  ['seccion', 'sección'],
  ['Seccion', 'Sección'],
  ['secciones', 'secciones'],
  ['rapido', 'rápido'],
  ['Rapido', 'Rápido'],
  ['basico', 'básico'],
  ['Basico', 'Básico'],
  ['tecnica', 'técnica'],
  ['Tecnica', 'Técnica'],
  ['tecnico', 'técnico'],
  ['Tecnico', 'Técnico'],
  ['logica', 'lógica'],
  ['Logica', 'Lógica'],
  ['codigo', 'código'],
  ['Codigo', 'Código'],
  ['imagenes', 'imágenes'],
  ['Imagenes', 'Imágenes'],
  ['pagina', 'página'],
  ['Pagina', 'Página'],
  ['paginas', 'páginas'],
  ['Paginas', 'Páginas'],
  ['navegacion', 'navegación'],
  ['Navegacion', 'Navegación'],
  ['busqueda', 'búsqueda'],
  ['Busqueda', 'Búsqueda'],
  ['envio', 'envío'],
  ['Envio', 'Envío'],
  ['galeria', 'galería'],
  ['Galeria', 'Galería'],
  ['tambien', 'también'],
  ['Tambien', 'También'],
  ['mas', 'más'],
  ['Mas', 'Más'],
  ['aqui', 'aquí'],
  ['Aqui', 'Aquí'],
  ['esta', 'está'],
  ['Esta', 'Esta'],
  ['estan', 'están'],
  ['Estan', 'Están'],
  ['como', 'cómo'],
  ['Como ', 'Cómo '],
  ['que ', 'qué '],
  ['aun', 'aún'],
  ['Aun', 'Aún'],
  ['politica', 'política'],
  ['Politica', 'Política'],
  ['terminos', 'términos'],
  ['Terminos', 'Términos'],
  ['configuracion', 'configuración'],
  ['Configuracion', 'Configuración'],
  ['unico', 'único'],
  ['Unico', 'Único']
];

const regexReplacements: Array<[RegExp, string]> = [
  [/^Editing (.+)$/u, 'Editando $1'],
  [/^Create a new (.+)$/u, 'Crear $1']
];

function replaceText(value: string): string {
  let result = value;

  exactReplacements.forEach(([source, target]) => {
    if (result === source) {
      result = target;
    }
  });

  regexReplacements.forEach(([pattern, replacement]) => {
    result = result.replace(pattern, replacement);
  });

  inlineSpanishFixes.forEach(([source, target]) => {
    result = result.replaceAll(source, target);
  });

  return result;
}

function localizeAdminDocument() {
  const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) {
        return NodeFilter.FILTER_REJECT;
      }
      if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      if (!node.nodeValue?.trim()) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const textNodes: Text[] = [];
  while (textWalker.nextNode()) {
    textNodes.push(textWalker.currentNode as Text);
  }

  textNodes.forEach((node) => {
    const nextValue = replaceText(node.nodeValue || '');
    if (nextValue !== node.nodeValue) {
      node.nodeValue = nextValue;
    }
  });

  document
    .querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input[placeholder], textarea[placeholder]')
    .forEach((element) => {
      const placeholder = element.getAttribute('placeholder');
      if (!placeholder) {
        return;
      }
      const nextValue = replaceText(placeholder);
      if (nextValue !== placeholder) {
        element.setAttribute('placeholder', nextValue);
      }
    });

  if (document.title) {
    document.title = replaceText(document.title);
  }

  document.querySelectorAll('.footer-right, .footer-left').forEach((element) => {
    const text = (element.textContent || '').trim();
    if (text === 'Version 2.1.1') {
      element.textContent = '';
    }
  });
}

export default function AdminLocaleRuntime() {
  React.useEffect(() => {
    const run = () => localizeAdminDocument();

    run();
    const observer = new MutationObserver(() => run());
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['placeholder', 'value', 'title']
    });

    return () => observer.disconnect();
  }, []);

  return null;
}

export const layout = {
  areaId: 'content',
  sortOrder: 999
};
