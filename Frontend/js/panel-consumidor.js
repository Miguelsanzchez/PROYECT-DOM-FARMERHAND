  import { getUsuario, logout } from './auth.js'
  import { apiFetch } from './api.js'

  function init() {
      const usuario = getUsuario()
      if (!usuario || usuario.rol !== 'consumidor') {
          window.location.href = '/pages/login.html'
          return
      }

      document.getElementById('infoUsuario').textContent = `${usuario.nombre}`
      document.getElementById('btnLogout').addEventListener('click', logout)

      cargarPedidos()
      cargarSolicitud()
  }

  // ── PEDIDOS ──
  async function cargarPedidos() {
      const contenedor = document.getElementById('tablaPedidos')
      contenedor.innerHTML = '<p class="empty-state">Cargando...</p>'

      try {
          const pedidos = await apiFetch('/api/pedidos/mis-pedidos')

          if (!pedidos.length) {
              contenedor.innerHTML = '<p class="empty-state">Aún no has realizado ningún pedido.</p>'
              return
          }

          contenedor.innerHTML = buildTablaPedidos(pedidos)
      } catch (err) {
          contenedor.innerHTML = `<p class="error-state">Error: ${err.message}</p>`
      }
  }

  function buildTablaPedidos(pedidos) {
      const filas = pedidos.map(p => {
          const productos = p.lineas_pedido
              ?.map(l => l.productos?.nombre ?? '—')
              .join(', ') ?? '—'

          return `
              <tr>
                  <td>${new Date(p.created_at).toLocaleDateString('es-ES')}</td>
                  <td>${productos}</td>
                  <td>€${parseFloat(p.total).toFixed(2)}</td>
                  <td>${p.direccion_envio}</td>
                  <td><span class="badge badge-${p.estado}">${p.estado}</span></td>
              </tr>
          `
      }).join('')

      return `
          <table>
              <thead>
                  <tr>
                      <th>Fecha</th>
                      <th>Productos</th>
                      <th>Total</th>
                      <th>Dirección de envío</th>
                      <th>Estado</th>
                  </tr>
              </thead>
              <tbody>${filas}</tbody>
          </table>
      `
  }

  // ── SOLICITUD AGRICULTOR ──
  async function cargarSolicitud() {
      const contenedor = document.getElementById('seccionSolicitud')
      contenedor.innerHTML = '<p class="empty-state">Cargando...</p>'

      try {
          const solicitud = await apiFetch('/api/agricultores/mi-solicitud')
          contenedor.innerHTML = renderSolicitud(solicitud)

          if (!solicitud || solicitud.estado === 'rechazado') {
              document.getElementById('formSolicitud')
                  ?.addEventListener('submit', enviarSolicitud)
          }
      } catch (err) {
          contenedor.innerHTML = `<p class="error-state">Error: ${err.message}</p>`
      }
  }

  function renderSolicitud(solicitud) {
      if (!solicitud) {
          return `
              <p>Únete como agricultor y empieza a vender tus productos directamente a consumidores.</p>
              ${formSolicitudHTML()}
          `
      }

      if (solicitud.estado === 'pendiente') {
          return `
              <p><span class="badge badge-pendiente">En revisión</span>
              Tu solicitud está siendo revisada por el equipo de FarmerHand.</p>
              <p class="empty-state">Finca: ${solicitud.nombre_finca} · ${solicitud.localizacion}</p>
          `
      }

      if (solicitud.estado === 'rechazado') {
          return `
              <p><span class="badge badge-rechazado">No aprobada</span>
              Tu solicitud anterior no fue aprobada. Puedes volver a solicitarlo.</p>
              ${formSolicitudHTML()}
          `
      }

      return '' // aprobado → ya es agricultor, no debería estar en este panel
  }

  function formSolicitudHTML() {
      return `
          <form id="formSolicitud" style="margin-top:1rem;">
              <div class="input-group">
                  <label for="nombre_finca">Nombre de la finca *</label>
                  <input type="text" id="nombre_finca" required placeholder="Ej: Huerta El Olivo" />
              </div>
              <div class="input-group">
                  <label for="localizacion">Localización *</label>
                  <input type="text" id="localizacion" required placeholder="Ej: Murcia, España" />
              </div>
              <div class="input-group">
                  <label for="descripcion">Descripción (opcional)</label>
                  <textarea id="descripcion" rows="3" placeholder="Cuéntanos sobre tu finca..."></textarea>
              </div>
              <p id="errorSolicitud" class="error-msg" hidden></p>
              <button type="submit" class="btn btn-primary">Enviar solicitud</button>
          </form>
      `
  }

  async function enviarSolicitud(e) {
      e.preventDefault()
      const errorEl = document.getElementById('errorSolicitud')
      const btn = e.target.querySelector('button[type="submit"]')

      const payload = {
          nombre_finca: document.getElementById('nombre_finca').value.trim(),
          localizacion:  document.getElementById('localizacion').value.trim(),
          descripcion:   document.getElementById('descripcion').value.trim()
      }

      btn.disabled = true
      btn.textContent = 'Enviando...'

      try {
          await apiFetch('/api/agricultores/alta', {
              method: 'POST',
              body: JSON.stringify(payload)
          })
          cargarSolicitud() // recargar para mostrar estado "pendiente"
      } catch (err) {
          errorEl.textContent = err.message
          errorEl.hidden = false
          btn.disabled = false
          btn.textContent = 'Enviar solicitud'
      }
  }

  document.addEventListener('DOMContentLoaded', init)