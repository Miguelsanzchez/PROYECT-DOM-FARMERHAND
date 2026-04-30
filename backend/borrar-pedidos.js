/**
 * borrar-pedidos.js
 * Borra TODOS los pedidos y su contenido relacionado.
 * NO toca usuarios ni productos.
 *
 * Orden obligatorio por FK:
 *   1. valoraciones   (→ pedidos)
 *   2. lineas_pedido  (→ pedidos)
 *   3. pedidos
 */

const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

async function borrarPedidos() {
  console.log('🗑️  Borrado de pedidos — FarmerHand\n')

  // ── 1. Contar antes de borrar ──────────────────────────────────────────
  const [{ count: cVal }, { count: cLin }, { count: cPed }] = await Promise.all([
    supabase.from('valoraciones').select('*', { count: 'exact', head: true }),
    supabase.from('lineas_pedido').select('*', { count: 'exact', head: true }),
    supabase.from('pedidos').select('*',       { count: 'exact', head: true }),
  ])

  console.log(`Registros actuales:`)
  console.log(`  valoraciones:  ${cVal ?? '?'}`)
  console.log(`  lineas_pedido: ${cLin ?? '?'}`)
  console.log(`  pedidos:       ${cPed ?? '?'}\n`)

  if (!cPed) {
    console.log('ℹ️  No hay pedidos. Nada que borrar.')
    process.exit(0)
  }

  // ── 2. Valoraciones ────────────────────────────────────────────────────
  console.log('Borrando valoraciones...')
  const { error: e1 } = await supabase
    .from('valoraciones')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000') // condición siempre verdadera

  if (e1) { console.error(`  ❌ ${e1.message}`); process.exit(1) }
  console.log('  ✅ Valoraciones borradas')

  // ── 3. Líneas de pedido ────────────────────────────────────────────────
  console.log('Borrando lineas_pedido...')
  const { error: e2 } = await supabase
    .from('lineas_pedido')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000')

  if (e2) { console.error(`  ❌ ${e2.message}`); process.exit(1) }
  console.log('  ✅ Líneas de pedido borradas')

  // ── 4. Pedidos ─────────────────────────────────────────────────────────
  console.log('Borrando pedidos...')
  const { error: e3 } = await supabase
    .from('pedidos')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000')

  if (e3) { console.error(`  ❌ ${e3.message}`); process.exit(1) }
  console.log('  ✅ Pedidos borrados')

  // ── 5. Verificación final ──────────────────────────────────────────────
  const [{ count: vVal }, { count: vLin }, { count: vPed }] = await Promise.all([
    supabase.from('valoraciones').select('*', { count: 'exact', head: true }),
    supabase.from('lineas_pedido').select('*', { count: 'exact', head: true }),
    supabase.from('pedidos').select('*',       { count: 'exact', head: true }),
  ])

  console.log('\nResultado:')
  console.log(`  valoraciones:  ${vVal ?? '?'}`)
  console.log(`  lineas_pedido: ${vLin ?? '?'}`)
  console.log(`  pedidos:       ${vPed ?? '?'}`)
  console.log('\n✅ Listo. Usuarios y productos intactos.')
  process.exit(0)
}

borrarPedidos().catch(err => {
  console.error('❌ Error fatal:', err.message)
  process.exit(1)
})
