# FarmerHand — Marketplace de productos agrícolas locales

**Proyecto de Fin de Grado · Desarrollo de Aplicaciones Web · 2024/2026**  
Autor: Miguel Sanz

---

## ¿Qué es FarmerHand?

FarmerHand es una plataforma marketplace que conecta agricultores directamente con consumidores, eliminando intermediarios. Los agricultores pueden publicar sus productos y gestionar sus pedidos, mientras los consumidores compran de forma directa desde el origen con pago integrado mediante Stripe.

La plataforma incluye tres roles diferenciados (consumidor, agricultor y administrador), un sistema de cajas por producto, pagos reales con tarjeta, y un flujo de solicitud para que cualquier usuario pueda convertirse en agricultor con aprobación del administrador.

---

## Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Frontend | HTML5, CSS3, JavaScript (ES Modules, sin framework) |
| Backend | Node.js + Express 5 |
| Base de datos | PostgreSQL gestionada con Supabase |
| Autenticación | JWT + bcrypt |
| Pagos | Stripe (Payment Intents API) |
| Despliegue frontend | Vercel |
| Despliegue backend | Render |

---

## Demo en producción

- **Frontend:** https://proyect-dom-farmerhand.vercel.app
- **Backend API:** https://proyect-dom-farmerhand.onrender.com

> El backend está en Render con plan gratuito, por lo que puede tardar unos segundos en responder si lleva un rato inactivo.

---

## Funcionalidades por rol

### Consumidor
- Explorar el catálogo de productos con filtros por categoría y disponibilidad
- Seleccionar tamaño de caja (ej: 1 kg, 3 kg, 5 kg) con precios distintos
- Añadir productos al carrito (persistente en localStorage)
- Finalizar la compra con dirección de envío y pago con tarjeta (Stripe)
- Consultar el historial de pedidos y su estado
- Valorar productos recibidos
- Solicitar convertirse en agricultor desde el panel

### Agricultor
- Gestionar su catálogo de productos (crear, editar, eliminar, activar/desactivar)
- Configurar opciones de caja por producto con descuentos
- Ver los pedidos recibidos con filtros por estado, fecha y producto
- Actualizar el estado de los pedidos (confirmado → enviado → entregado)

### Administrador
- Ver todos los usuarios registrados en la plataforma
- Gestionar las solicitudes de alta como agricultor (aprobar o rechazar)
- Visualizar el estado general de la plataforma

---

## Flujos principales

### Compra con pago
1. El consumidor añade productos al carrito
2. En el checkout introduce su dirección y datos de tarjeta
3. El frontend llama a `POST /api/pagos/crear-intent` → recibe el `clientSecret` de Stripe
4. Stripe procesa el pago; si es correcto, se crea el pedido en `POST /api/pedidos`
5. El backend verifica el pago con Stripe antes de registrar el pedido (comisión del 5%)

### Solicitud de agricultor
1. El usuario se registra o inicia sesión como consumidor
2. Accede a "Hazte agricultor" y rellena el formulario con datos de su finca
3. La solicitud queda en estado `pendiente`
4. El administrador la aprueba desde su panel → el usuario pasa automáticamente a rol `agricultor`

---

## Ejecución en local

### Requisitos previos
- Node.js 18 o superior
- Acceso a internet (Supabase está en la nube)

### 1. Instalar dependencias

```bash
cd backend
npm install
```

### 2. Configurar variables de entorno

Crea el archivo `backend/.env` con el siguiente contenido:

```env
PORT=3001
SUPABASE_URL=tu_supabase_url
SUPABASE_KEY=tu_supabase_key
JWT_SECRET=una_clave_secreta_larga
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Cargar datos de demo

```bash
npm run seed
```

Este script crea los usuarios de prueba, perfiles de agricultores y productos de ejemplo. Es seguro ejecutarlo varias veces (no duplica datos existentes).

### 4. Arrancar el backend

```bash
npm start          # modo producción
npm run dev        # modo desarrollo con auto-restart
```

El servidor arranca en `http://localhost:3001`. Para verificar que funciona:

```
GET http://localhost:3001
→ {"mensaje":"FarmerHand API funcionando"}
```

### 5. Abrir el frontend

Abre `Frontend/public/index.html` directamente en el navegador, o usa Live Server en VS Code.

Para servir el frontend en local con hot reload:

```bash
npm run frontend   # sirve en http://localhost:3000
```

O para lanzar frontend y backend juntos:

```bash
npm run dev        # desde la raíz del proyecto
```

---

## Estructura del proyecto

```
FARMERHAND_CLEAN/
├── Frontend/
│   └── public/
│       ├── index.html                  ← landing page + catálogo
│       ├── pages/
│       │   ├── login.html
│       │   ├── registro.html
│       │   ├── catalogo.html
│       │   ├── panel-admin.html
│       │   ├── panel-agricultor.html
│       │   ├── panel-consumidor.html
│       │   ├── carrito.html
│       │   ├── solicitud-agricultor.html
│       │   ├── adopciones.html
│       │   └── producto-detalle.html
│       ├── js/
│       │   ├── api.js                  ← wrapper de fetch con JWT automático
│       │   ├── auth.js                 ← login, registro, logout, redirección por rol
│       │   ├── navbar.js               ← navbar compartida de los paneles
│       │   ├── app.js                  ← navbar + catálogo de la landing
│       │   ├── carrito.js              ← lógica del carrito (localStorage)
│       │   ├── carrito-desplegable.js  ← drawer lateral + checkout modal
│       │   ├── panel-admin.js
│       │   ├── panel-agricultor.js
│       │   ├── panel-consumidor.js
│       │   └── ...
│       └── css/
└── backend/
    ├── server.js                       ← entrada principal (puerto 3001)
    ├── seed.js                         ← datos de demo
    ├── routes/
    │   ├── auth.js                     ← registro y login
    │   ├── productos.js                ← CRUD de productos y opciones de caja
    │   ├── pedidos.js                  ← creación y consulta de pedidos
    │   ├── agricultores.js             ← alta y perfil de agricultor
    │   ├── pagos.js                    ← Stripe (crear intent + webhook)
    │   ├── valoraciones.js             ← valoraciones de productos
    │   └── admin.js                    ← gestión de usuarios y solicitudes
    ├── middleware/
    │   ├── auth.js                     ← verificación JWT
    │   ├── authorize.js                ← control de acceso por rol
    │   └── roles.js                    ← alias legacy de authorize
    └── config/
        └── supabase.js                 ← cliente de Supabase
```

---

## Esquema de base de datos (tablas principales)

| Tabla | Descripción |
|-------|-------------|
| `usuarios` | Usuarios registrados con rol (`consumidor`, `agricultor`, `admin`) |
| `agricultores` | Perfil extendido del agricultor con estado de aprobación |
| `productos` | Productos publicados por los agricultores |
| `opciones_caja` | Tamaños de caja disponibles por producto (kg, precio, descuento) |
| `pedidos` | Pedidos realizados por consumidores con estado y pago Stripe |
| `lineas_pedido` | Líneas de cada pedido (producto, cantidad, precio) |
| `valoraciones` | Valoraciones de productos por consumidores |

---

## Decisiones técnicas

- **Sin framework de frontend**: el proyecto usa JavaScript puro con ES Modules nativos del navegador. Fue una decisión consciente para dominar los fundamentos antes de usar React u otros frameworks.
- **Supabase como BaaS**: permite tener una base de datos PostgreSQL real sin gestionar servidores de base de datos. El cliente JS de Supabase simplifica las consultas sin necesidad de un ORM.
- **JWT stateless**: el token se guarda en `localStorage` y se adjunta manualmente en cada petición mediante el módulo `api.js`. El rol viaja dentro del token para evitar consultas extra en cada request.
- **Stripe Payment Intents**: se usa el flujo de dos pasos (crear intent en backend → confirmar en frontend) para no exponer la clave secreta de Stripe en el cliente.
- **Webhook de Stripe**: el endpoint `/api/pagos/webhook` recibe el cuerpo en formato `raw` (sin parsear como JSON) porque Stripe necesita el body original para verificar la firma.

---

## Notas para la corrección

- El archivo `.env` del backend **está incluido en la entrega** para facilitar la evaluación local.
- El seed crea datos de demostración realistas: 3 categorías de productos (verduras, frutas, lácteos/aceites) con múltiples opciones de caja y descuentos.
- El flujo de pago puede probarse con la tarjeta de prueba de Stripe: `4242 4242 4242 4242`, cualquier fecha futura y cualquier CVC.
- Para probar el webhook de Stripe en local se necesita la CLI de Stripe (`stripe listen`), aunque en producción funciona automáticamente.
