import { estaAutenticado, getUsuario } from './auth.js'
  import { apiFetch } from './api.js'

  // ── GESTIÓN DEL CARRITO (localStorage) ──

  export function getCarrito() {
      return JSON.parse(localStorage.getItem('carrito') ?? '[]')
  }

  export function guardarCarrito(items) {
      localStorage.setItem('carrito', JSON.stringify(items))
  }

  export function añadirAlCarrito(producto) {
      const carrito = getCarrito()
      const existente = carrito.find(i => i.producto_id === producto.producto_id)
      if (existente) {
          existente.cantidad++
      } else {
          carrito.push({ ...producto, cantidad: 1 })
      }
      guardarCarrito(carrito)
  }

  export function getTotalCarrito() {
      return getCarrito().reduce((sum, i) => sum + i.precio_unidad * i.cantidad, 0)
  }

  export function contarItems() {
      return getCarrito().reduce((sum, i) => sum + i.cantidad, 0)
  }

  // ── PÁGINA DEL CARRITO ──

  function init() {
      renderCarrito()

      document.getElementById('btnConfirmarPedido')?.addEventListener('click', confirmarPedido)
  }

  function renderCarrito() {
      const carrito = getCarrito()
      const lista = document.getElementById('listaCarrito')
      const resumen = document.getElementById('resumenPedido')
      const seccionCheckout = document.getElementById('seccionCheckout')
      const msgLogin = document.getElementById('msgLogin')

      if (!carrito.length) {
          lista.innerHTML = '<p class="empty-state">Tu carrito está vacío.<br><a href="../index.html" style="color:#7cb342">Ver productos</a></p>'
          resumen.innerHTML = ''
          return
      }

      // Lista de items
      lista.innerHTML = carrito.map(item => `
          <div class="carrito-item">
              <div class="item-info">
                  <p class="item-nombre">${item.nombre}</p>
                  <p class="item-precio">€${item.precio_unidad.toFixed(2)} / kg</p>
              </div>
              <div class="item-cantidad">
                  <button class="btn-cantidad" data-id="${item.producto_id}" data-accion="restar">−</button>
                  <span>${item.cantidad}</span>
                  <button class="btn-cantidad" data-id="${item.producto_id}" data-accion="sumar">+</button>
              </div>
              <div class="item-subtotal">€${(item.precio_unidad * item.cantidad).toFixed(2)}</div>
          </div>
      `).join('')

      lista.querySelectorAll('.btn-cantidad').forEach(btn => {
          btn.addEventListener('click', () => cambiarCantidad(btn.dataset.id, btn.dataset.accion))
      })

      // Resumen
      const total = getTotalCarrito()
      const comision = total * 0.05

      resumen.innerHTML = `
          <div class="resumen-linea"><span>Subtotal</span><span>€${total.toFixed(2)}</span></div>
          <div class="resumen-linea"><span>Comisión plataforma (5%)</span><span>€${comision.toFixed(2)}</span></div>
          <div class="resumen-linea total"><span>Total</span><span>€${(total + comision).toFixed(2)}</span></div>
      `

      // Mostrar checkout si está autenticado
      if (estaAutenticado() && getUsuario()?.rol === 'consumidor') {
          seccionCheckout.style.display = 'block'
          msgLogin.style.display = 'none'
      } else {
          seccionCheckout.style.display = 'none'
          msgLogin.style.display = 'block'
      }
  }

  function cambiarCantidad(productoId, accion) {
      const carrito = getCarrito()
      const idx = carrito.findIndex(i => i.producto_id === productoId)
      if (idx === -1) return

      if (accion === 'sumar') {
          carrito[idx].cantidad++
      } else {
          carrito[idx].cantidad--
          if (carrito[idx].cantidad <= 0) carrito.splice(idx, 1)
      }

      guardarCarrito(carrito)
      renderCarrito()
  }

  async function confirmarPedido() {
      const direccion = document.getElementById('direccionEnvio').value.trim()
      if (!direccion) {
          alert('Por favor, introduce una dirección de envío.')
          return
      }

      const carrito = getCarrito()
      const items = carrito.map(i => ({
          producto_id:   i.producto_id,
          agricultor_id: i.agricultor_id,
          cantidad:      i.cantidad,
          precio_unidad: i.precio_unidad
      }))

      const btn = document.getElementById('btnConfirmarPedido')
      btn.textContent = 'Procesando...'
      btn.disabled = true

      try {
          await apiFetch('/api/pedidos', {
              method: 'POST',
              body: JSON.stringify({ direccion_envio: direccion, items })
          })

          guardarCarrito([])
          alert('¡Pedido realizado correctamente! Puedes ver el estado en tu panel.')
          window.location.href = 'panel-consumidor.html'
      } catch (err) {
          alert(`Error al procesar el pedido: ${err.message}`)
          btn.textContent = 'Confirmar pedido'
          btn.disabled = false
      }
  }

  document.addEventListener('DOMContentLoaded', init)


  