# FarmerHand — Marketplace de productos ecológicos

Proyecto TFG — Desarrollo de Aplicaciones Web · 2024/2025  
Autor: Miguel Sanz

Plataforma marketplace que conecta agricultores directamente con consumidores, sin intermediarios.

**Stack:** HTML + CSS + JavaScript · Node.js + Express · Supabase · JWT

---

## Requisitos previos

- [Node.js](https://nodejs.org/) versión 18 o superior
- Navegador moderno (Chrome, Firefox, Edge)
- Conexión a internet (la base de datos está en Supabase)

---

## Instrucciones de ejecución

### 1. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 2. Cargar datos de demo en la base de datos

```bash
npm run seed
```

Este comando crea automáticamente los tres usuarios de prueba y productos de ejemplo.

### 3. Arrancar el servidor

```bash
npm start
```

Debes ver en la terminal:

```
Servidor corriendo en http://localhost:3001
```

### 4. Abrir el frontend

Abre el archivo `frontend/index.html` directamente en el navegador:

- **macOS:** doble clic sobre el archivo o arrastrarlo al navegador
- **Windows:** doble clic sobre el archivo
- **VS Code:** instalar la extensión "Live Server" → clic derecho sobre `frontend/index.html` → "Open with Live Server"

---

## Usuarios de prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| Administrador | `admin@farmerhand.com` | `admin1234` |
| Agricultor | `agricultor@farmerhand.com` | `demo1234` |
| Consumidor | `consumidor@farmerhand.com` | `demo1234` |

---

## Flujos que se pueden probar

### Como administrador (`admin@farmerhand.com`)
1. Iniciar sesión → panel de administración
2. Ver lista de todos los usuarios registrados
3. Ver solicitudes de agricultores pendientes
4. Aprobar o rechazar solicitudes

### Como agricultor (`agricultor@farmerhand.com`)
1. Iniciar sesión → panel de agricultor
2. Ver, crear, editar y eliminar productos
3. Activar/desactivar disponibilidad de productos
4. Ver pedidos recibidos y actualizar su estado (confirmado / enviado / entregado)

### Como consumidor (`consumidor@farmerhand.com`)
1. Iniciar sesión → explorar catálogo de productos
2. Añadir productos al carrito
3. Introducir dirección de envío y confirmar pedido
4. Ver historial de pedidos en el panel

### Flujo solicitud de agricultor
1. Registrarse como nuevo usuario (o usar el consumidor de demo)
2. Ir a "Quiero ser agricultor" → rellenar formulario
3. Iniciar sesión como admin y aprobar la solicitud
4. El usuario pasa a tener rol de agricultor automáticamente

---

## Verificación rápida

Comprueba que el backend funciona abriendo en el navegador:

```
http://localhost:3001
```

Debe responder: `{"mensaje":"FarmerHand API funcionando"}`

---

## Estructura del proyecto

```
PROYECT-DOM-FARMERHAND-main/
├── frontend/
│   ├── index.html              ← página principal / catálogo
│   ├── pages/
│   │   ├── login.html
│   │   ├── registro.html
│   │   ├── panel-admin.html
│   │   ├── panel-agricultor.html
│   │   ├── panel-consumidor.html
│   │   ├── carrito.html
│   │   ├── solicitud-agricultor.html
│   │   └── catalogo.html
│   ├── js/                     ← lógica por módulo
│   └── css/                    ← estilos por sección
└── backend/
    ├── server.js               ← entrada principal (puerto 3001)
    ├── seed.js                 ← script para datos de demo
    ├── .env                    ← variables de entorno (incluido en entrega)
    ├── routes/
    │   ├── auth.js             ← registro y login
    │   ├── productos.js        ← CRUD de productos
    │   ├── pedidos.js          ← creación y gestión de pedidos
    │   ├── agricultores.js     ← solicitudes de alta como agricultor
    │   └── admin.js            ← panel de administración
    ├── middleware/
    │   ├── auth.js             ← verificación JWT
    │   └── roles.js            ← control de acceso por rol
    └── config/
        └── supabase.js         ← conexión a Supabase
```

---

## Notas técnicas

- Autenticación con JWT (7 días de validez)
- Contraseñas cifradas con bcrypt
- Base de datos PostgreSQL gestionada con Supabase
- El frontend usa módulos ES nativos (`type="module"`)
- Sin frameworks de frontend, sin bundler — HTML/CSS/JS puro
