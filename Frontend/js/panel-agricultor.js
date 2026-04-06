import { getUsuario, logout } from './auth.js'
  import { apiFetch } from './api.js'

  function init() {
      const usuario = getUsuario()
      if (!usuario || usuario.rol !== 'agricultor') {
          window.location.href = '/pages/login.html'
          return
      }

      document.getElementById('infoUsuario').textContent = `${usuario.nombre} · Agricultor`
      document.getElementById('btnLogout').addEventListener('click', logout)
      document.getElementById('btnNuevoProducto').addEventListener('click', abrirModalNuevo)
      document.getElementById('btnCancelarModal').addEventListener('click', cerrarModal)
      document.getElementById('formProducto').addEventListener('submit', guardarProducto)

      cargarProductos()
      cargarPedidos()
  }

  // ── PRODUCTOS ──
  async function cargarProductos() {
      const contenedor = document.getElementById('tablaProductos')
      contenedor.innerHTML = '<p class="empty-state">Cargando...</p>'

      try {
          const productos = await apiFetch('/api/productos/mis-productos')

          if (!productos.length) {
              contenedor.innerHTML = '<p class="empty-state">No tienes productos aún. Añade el primero.</p>'
              return
          }

          contenedor.innerHTML = buildTablaProductos(productos)

          contenedor.querySelectorAll('.btn-editar').forEach(btn =>
              btn.addEventListener('click', () => abrirModalEditar(JSON.parse(btn.dataset.producto)))
          )
          contenedor.querySelectorAll('.btn-eliminar').forEach(btn =>
              btn.addEventListener('click', () => eliminarProducto(btn.dataset.id))
          )
          contenedor.querySelectorAll('.toggle-disponible').forEach(chk =>
              chk.addEventListener('change', () => toggleDisponible(chk.dataset.id, chk.checked))
          )
      } catch (err) {
          contenedor.innerHTML = `<p class="error-state">Error: ${err.message}</p>`
      }
  }

  function buildTablaProductos(productos) {
      const filas = productos.map(p => `
          <tr>
              <td>${p.nombre}</td>
              <td>${p.categoria ?? '—'}</td>
              <td>€${parseFloat(p.precio_por_kg).toFixed(2)}</td>
              <td>
                  <label style="display:flex;align-items:center;gap:6px;cursor:pointer;">
                      <input type="checkbox" class="toggle-disponible" data-id="${p.id}"
                          ${p.disponible ? 'checked' : ''} />
                      <span class="badge badge-${p.disponible ? 'disponible' : 'agotado'}">
                          ${p.disponible ? 'Disponible' : 'Agotado'}
                      </span>
                  </label>
              </td>
              <td>
                  <button class="btn btn-secondary btn-sm btn-editar"
                      data-producto='${JSON.stringify(p).replace(/'/g, "&#39;")}'>
                      Editar
                  </button>
                  <button class="btn btn-danger btn-sm btn-eliminar" data-id="${p.id}">
                      Eliminar
                  </button>
              </td>
          </tr>
      `).join('')

      return `
          <table>
              <thead>
                  <tr>
                      <th>Nombre</th><th>Categoría</th><th>€/kg</th>
                      <th>Disponibilidad</th><th>Acciones</th>
                  </tr>
              </thead>
              <tbody>${filas}</tbody>
          </table>
      `
  }

  async function guardarProducto(e) {
      e.preventDefault()
      const id = document.getElementById('productoId').value

      const payload = {
          nombre:        document.getElementById('nombre').value.trim(),
          descripcion:   document.getElementById('descripcion').value.trim(),
          precio_por_kg: parseFloat(document.getElementById('precio_por_kg').value),
          categoria:     document.getElementById('categoria').value,
          tiempo_envio:  parseInt(document.getElementById('tiempo_envio').value) || null
      }

      try {
          if (id) {
              await apiFetch(`/api/productos/${id}`, {
                  method: 'PATCH',
                  body: JSON.stringify(payload)
              })
          } else {
              await apiFetch('/api/productos', {
                  method: 'POST',
                  body: JSON.stringify(payload)
              })
          }
          cerrarModal()
          cargarProductos()
      } catch (err) {
          alert(`Error al guardar: ${err.message}`)
      }
  }

  async function eliminarProducto(id) {
      if (!confirm('¿Seguro que quieres eliminar este producto?')) return
      try {
          await apiFetch(`/api/productos/${id}`, { method: 'DELETE' })
          cargarProductos()
      } catch (err) {
          alert(`Error al eliminar: ${err.message}`)
      }
  }

  async function toggleDisponible(id, disponible) {
      try {
          await apiFetch(`/api/productos/${id}`, {
              method: 'PATCH',
              body: JSON.stringify({ disponible })
          })
          cargarProductos()
      } catch (err) {
          alert(`Error: ${err.message}`)
      }
  }

  // ── MODAL ──
  function abrirModalNuevo() {
      document.getElementById('modalTitulo').textContent = 'Nuevo Producto'
      document.getElementById('formProducto').reset()
      document.getElementById('productoId').value = ''
      document.getElementById('modalProducto').classList.add('active')
  }

  function abrirModalEditar(producto) {
      document.getElementById('modalTitulo').textContent = 'Editar Producto'
      document.getElementById('productoId').value = producto.id
      document.getElementById('nombre').value = producto.nombre
      document.getElementById('descripcion').value = producto.descripcion ?? ''
      document.getElementById('precio_por_kg').value = producto.precio_por_kg
      document.getElementById('categoria').value = producto.categoria ?? ''
      document.getElementById('tiempo_envio').value = producto.tiempo_envio ?? ''
      document.getElementById('modalProducto').classList.add('active')
  }

  function cerrarModal() {
      document.getElementById('modalProducto').classList.remove('active')
  }

  // ── PEDIDOS ──
  async function cargarPedidos() {
      const contenedor = document.getElementById('tablaPedidos')
      contenedor.innerHTML = '<p class="empty-state">Cargando...</p>'

      try {
          const pedidos = await apiFetch('/api/pedidos/recibidos')

          if (!pedidos.length) {
              contenedor.innerHTML = '<p class="empty-state">No tienes pedidos recibidos aún.</p>'
              return
          }

          contenedor.innerHTML = buildTablaPedidos(pedidos)

          contenedor.querySelectorAll('.select-estado').forEach(sel =>
              sel.addEventListener('change', () => actualizarEstado(sel.dataset.id, sel.value))
          )
      } catch (err) {
          contenedor.innerHTML = `<p class="error-state">Error: ${err.message}</p>`
      }
  }

  function buildTablaPedidos(pedidos) {
      const filas = pedidos.map(l => `
          <tr>
              <td>${l.pedidos?.created_at
                  ? new Date(l.pedidos.created_at).toLocaleDateString('es-ES')
                  : '—'}</td>
              <td>${l.productos?.nombre ?? '—'}</td>
              <td>${l.cantidad}</td>
              <td>€${parseFloat(l.precio_unidad).toFixed(2)}</td>
              <td>${l.pedidos?.direccion_envio ?? '—'}</td>
              <td>
                  <select class="select-estado" data-id="${l.pedido_id}">
                      <option value="pendiente"  ${l.pedidos?.estado === 'pendiente'  ? 'selected' : ''}>Pendiente</option>
                      <option value="confirmado" ${l.pedidos?.estado === 'confirmado' ? 'selected' : ''}>Confirmado</option>
                      <option value="enviado"    ${l.pedidos?.estado === 'enviado'    ? 'selected' : ''}>Enviado</option>
                      <option value="entregado"  ${l.pedidos?.estado === 'entregado'  ? 'selected' : ''}>Entregado</option>
                  </select>
              </td>
          </tr>
      `).join('')

      return `
          <table>
              <thead>
                  <tr>
                      <th>Fecha</th><th>Producto</th><th>Cantidad</th>
                      <th>Precio/u</th><th>Dirección</th><th>Estado</th>
                  </tr>
              </thead>
              <tbody>${filas}</tbody>
          </table>
      `
  }

  async function actualizarEstado(pedidoId, estado) {
      try {
          await apiFetch(`/api/pedidos/${pedidoId}/estado`, {
              method: 'PATCH',
              body: JSON.stringify({ estado })
          })
      } catch (err) {
          alert(`Error al actualizar estado: ${err.message}`)
          cargarPedidos()
      }
  }

  document.addEventListener('DOMContentLoaded', init)