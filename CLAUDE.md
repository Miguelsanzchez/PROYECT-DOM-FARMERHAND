# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Run everything (backend + frontend together)
```bash
npm run dev
```

### Backend only
```bash
cd backend && npm start          # production
cd backend && npm run dev        # with --watch (auto-restart)
```

### Frontend only
```bash
npm run frontend                 # serves Frontend/ on port 3000 via http-server
```

### Seed demo data
```bash
cd backend && npm run seed
```

The backend runs on **port 3001**. The frontend is served on **port 3000** (or opened directly as a file). There are no tests.

---

## Architecture

### Overview

FarmerHand is a marketplace connecting farmers (agricultores) directly to consumers (consumidores). There are three roles: `consumidor`, `agricultor`, `admin`.

The project is split into two independent parts:
- **`backend/`** — Node.js + Express REST API (port 3001)
- **`Frontend/`** — Plain HTML/CSS/JS, ES modules, no bundler, no framework

They communicate exclusively via HTTP. The frontend stores the JWT in `localStorage` and attaches it as `Authorization: Bearer <token>` via `Frontend/js/api.js`.

### Backend

**Entry point:** `backend/server.js`

The webhook route `/api/pagos/webhook` must receive a raw body (not JSON-parsed), so `express.raw()` is registered for that path **before** `express.json()` — do not reorder these middlewares.

**Route map:**
| Prefix | File | Auth required |
|---|---|---|
| `/api/auth` | `routes/auth.js` | No |
| `/api/agricultores` | `routes/agricultores.js` | Partial |
| `/api/productos` | `routes/productos.js` | Partial |
| `/api/pedidos` | `routes/pedidos.js` | Yes |
| `/api/pagos` | `routes/pagos.js` | Partial |
| `/api/admin` | `routes/admin.js` | `admin` only |
| `/api/valoraciones` | `routes/valoraciones.js` | Yes |

**Middleware:**
- `middleware/auth.js` — exports `verificarToken`, reads JWT from `Authorization: Bearer` header, attaches decoded payload to `req.usuario`
- `middleware/authorize.js` — exports `authorize(...roles)`, checks `req.usuario.rol` against allowed roles (preferred, used in newer routes)
- `middleware/roles.js` — exports `verificarRol(...roles)`, same logic, legacy name (kept for backwards compatibility)

**Database (Supabase/PostgreSQL):**

All DB access is through the Supabase JS client in `config/supabase.js` (uses `SUPABASE_URL` + `SUPABASE_KEY`).

Key tables and their important columns:
- `usuarios` — `id, nombre, email, password_hash, rol, created_at`
- `agricultores` — `id, usuario_id, nombre_finca, localizacion, descripcion, certificacion, foto_url, zonas_envio, estado ('pendiente'|'aprobado'|'rechazado'), valoracion_media`
- `productos` — `id, agricultor_id, nombre, descripcion, precio_por_kg, categoria, tiempo_envio, envio_refrigerado, disponible`
- `opciones_caja` — `id, producto_id, kg, precio_total, descuento` (box size options for a product)
- `pedidos` — `id, consumidor_id, total, comision, estado ('confirmado'|'enviado'|'entregado'|'pagado'), direccion_envio, stripe_payment_id, created_at`
- `lineas_pedido` — `id, pedido_id, producto_id, opcion_caja_id, agricultor_id, cantidad, precio_unidad`

**Agricultor approval flow:** A `consumidor` submits a request via `POST /api/agricultores/alta` → stored in `agricultores` table with `estado: 'pendiente'`. Admin approves via `PATCH /api/admin/solicitudes/:id` which sets `agricultores.estado = 'aprobado'` AND updates `usuarios.rol = 'agricultor'`.

**Payment flow (Stripe):**
1. Frontend calls `POST /api/pagos/crear-intent` → returns `clientSecret` + `paymentIntentId`
2. Frontend completes payment with Stripe.js using the `clientSecret`
3. Frontend calls `POST /api/pedidos` with `stripe_payment_id` → backend verifies payment with Stripe before creating the order (platform takes 5% commission)
4. Stripe webhook `POST /api/pagos/webhook` also listens for `payment_intent.succeeded` to mark orders as `pagado`

**Required env vars** (see `backend/.env.example`):
```
PORT=3001
SUPABASE_URL=
SUPABASE_KEY=
JWT_SECRET=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
```

### Frontend

**Entry:** `Frontend/index.html` (landing + catalogue)

All JS files use ES module syntax (`import`/`export`). Each HTML page imports its own JS module via `<script type="module">`.

**Shared modules:**
- `js/api.js` — `apiFetch(endpoint, options)`: wraps `fetch`, auto-attaches JWT from localStorage, redirects to login on 401
- `js/auth.js` — `login()`, `registro()`, `logout()`, `getUsuario()`, `estaAutenticado()`, `redirigirSegunRol(usuario)`

**Page ↔ JS module mapping:**
- `index.html` → `js/landing.js` + `js/app.js`
- `pages/login.html` / `pages/registro.html` → `js/auth.js`
- `pages/panel-admin.html` → `js/panel-admin.js`
- `pages/panel-agricultor.html` → `js/panel-agricultor.js`
- `pages/panel-consumidor.html` → `js/panel-consumidor.js`
- `pages/carrito.html` → `js/carrito.js` + `js/carrito-desplegable.js`
- `pages/pagos.html` → `js/pagos.js`
- `pages/pago-completo.html` → `js/pago-completado.js`
- `pages/adopciones.html` → `js/adopciones.js`
- `pages/solicitud-agricultor.html` → `js/solicitud-agricultor.js`

Because the frontend is served as plain files (no SPA router), every page is a separate HTML file with its own `<script type="module">` entry point.

---

## Demo credentials

| Role | Email | Password |
|---|---|---|
| Admin | `admin@farmerhand.com` | `admin1234` |
| Agricultor | `agricultor@farmerhand.com` | `demo1234` |
| Consumidor | `consumidor@farmerhand.com` | `demo1234` |
