# 🌱 FarmerHand — Backend Context

## 📌 Objetivo del proyecto
Plataforma marketplace donde agricultores venden directamente a consumidores sin intermediarios.

Incluye:
- Registro/login con JWT
- Roles: consumidor, agricultor, administrador
- Productos por agricultor
- Carrito y pedidos
- Pagos con Stripe
- Adopción de árboles

---

## 🧠 Reglas generales
- Usar siempre los nombres exactos de la base de datos.
- No inventar columnas ni tablas.
- Si algo no coincide con el esquema, corregirlo.
- Código en Express + Supabase.
- Autenticación con JWT.
- Validaciones siempre en backend.
- Código listo para copiar, sin explicaciones largas.

---

## 🗄️ Base de datos (Supabase)

### Tabla: pedidos
- id (uuid)
- consumidor_id (uuid)
- total (numeric)
- comision (numeric)
- estado (text)
- direccion_envio (text)
- stripe_payment_id (text)
- created_at (timestamp)

### Tabla: lineas_pedido
- id (uuid)
- pedido_id (uuid)
- producto_id (uuid)
- opcion_caja_id (uuid)
- agricultor_id (uuid)
- cantidad (integer)
- precio_unidad (numeric)
- created_at (timestamp)

(Relaciones con pedidos, productos, opciones_caja, agricultores)

---

## 👥 Roles
- consumidor → compra productos
- agricultor → gestiona productos y pedidos recibidos
- administrador → gestiona plataforma

---

## 🔐 Autenticación
- JWT en middleware
- bcrypt para passwords
- middleware verificarToken
- middleware verificarRol

---

## 🧩 Backend (Express)

Estructura:
- routes/
- middleware/
- config/

---

## 📦 Estado actual del backend

✔ Registro y login  
✔ Middleware de autenticación  
✔ Middleware de roles  
✔ CRUD de productos  
✔ Sistema de pedidos (creación + consulta)  
⏳ Falta:
- actualizar estado de pedidos
- integración Stripe
- webhooks Stripe
- completar flujo de checkout

---

## 🚀 Instrucciones para Claude

Cuando se le pida ayuda:

- Usar este archivo como fuente de verdad
- No asumir estructuras externas
- Validar siempre contra este esquema
- Generar código listo para copiar
- Mantener consistencia con nombres de columnas

---
