const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })
const bcrypt = require('bcrypt')
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

// ─── DATOS DE LOS 3 AGRICULTORES ────────────────────────────────────────────

const AGRICULTORES = [
  {
    email:       'agricultor1@farmerhand.com',
    nombre:      'Ana Martínez',
    nombre_finca:'Finca El Naranjo',
    localizacion:'Valencia, España',
    descripcion: 'Finca familiar especializada en cítricos y frutas de temporada',
    especialidad:'Frutas',
  },
  {
    email:       'agricultor2@farmerhand.com',
    nombre:      'Pedro Sánchez',
    nombre_finca:'Huerta Verde',
    localizacion:'Almería, España',
    descripcion: 'Cultivos hidropónicos y de temporada en invernadero ecológico',
    especialidad:'Verduras',
  },
  {
    email:       'agricultor3@farmerhand.com',
    nombre:      'Isabel Ruiz',
    nombre_finca:'Granja La Mancha',
    localizacion:'Toledo, España',
    descripcion: 'Producción artesanal de lácteos y aceite de oliva virgen extra',
    especialidad:'Lacteos/Aceites',
  },
]

// ─── CATÁLOGO COMPLETO DE PRODUCTOS ─────────────────────────────────────────
// indice 0 → agricultor1 (Frutas)
// indice 1 → agricultor2 (Verduras)
// indice 2 → agricultor3 (Lácteos/Aceites)

const PRODUCTOS = [
  // ── Agricultor 1: Frutas ──────────────────────────────────────────────────
  {
    agriIdx: 0,
    nombre:       'Naranjas Valencia',
    descripcion:  'Naranjas frescas de Valencia, zumo extra',
    precio_por_kg: 2.80,
    categoria:    'Frutas',
    foto_url:     'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=300&fit=crop',
  },
  {
    agriIdx: 0,
    nombre:       'Uvas Moscatel',
    descripcion:  'Uvas dulces de vendimia tardía',
    precio_por_kg: 3.50,
    categoria:    'Frutas',
    foto_url:     'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&h=300&fit=crop',
  },
  {
    agriIdx: 0,
    nombre:       'Melón Piel de Sapo',
    descripcion:  'Melones dulces cultivados al sol',
    precio_por_kg: 1.20,
    categoria:    'Frutas',
    foto_url:     'https://images.unsplash.com/photo-1571575173927-aad8f4cbdea6?w=400&h=300&fit=crop',
  },
  {
    agriIdx: 0,
    nombre:       'Sandía',
    descripcion:  'Sandías de pulpa roja y dulce',
    precio_por_kg: 0.80,
    categoria:    'Frutas',
    foto_url:     'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=400&h=300&fit=crop',
  },
  {
    agriIdx: 0,
    nombre:       'Peras Conferencia',
    descripcion:  'Peras jugosas de temporada otoñal',
    precio_por_kg: 2.20,
    categoria:    'Frutas',
    foto_url:     'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=300&fit=crop',
  },

  // ── Agricultor 2: Verduras ────────────────────────────────────────────────
  {
    agriIdx: 1,
    nombre:       'Tomates de Huerta',
    descripcion:  'Tomates maduros recogidos a mano',
    precio_por_kg: 3.50,
    categoria:    'Verduras',
    foto_url:     'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=300&fit=crop',
  },
  {
    agriIdx: 1,
    nombre:       'Pimientos Rojos',
    descripcion:  'Pimientos ecológicos de temporada',
    precio_por_kg: 4.20,
    categoria:    'Verduras',
    foto_url:     'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=300&fit=crop',
  },
  {
    agriIdx: 1,
    nombre:       'Berenjenas',
    descripcion:  'Berenjenas brillantes cultivadas sin pesticidas',
    precio_por_kg: 2.80,
    categoria:    'Verduras',
    foto_url:     'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=300&fit=crop',
  },
  {
    agriIdx: 1,
    nombre:       'Calabacines',
    descripcion:  'Calabacines tiernos de cosecha semanal',
    precio_por_kg: 2.40,
    categoria:    'Verduras',
    foto_url:     'https://images.unsplash.com/photo-1589927986089-35812378533c?w=400&h=300&fit=crop',
  },
  {
    agriIdx: 1,
    nombre:       'Pepinos',
    descripcion:  'Pepinos frescos de cultivo hidropónico',
    precio_por_kg: 1.90,
    categoria:    'Verduras',
    foto_url:     'https://images.unsplash.com/photo-1568584711271-6c929fb49b60?w=400&h=300&fit=crop',
  },
  {
    agriIdx: 1,
    nombre:       'Judías Verdes',
    descripcion:  'Judías finas recogidas en su punto',
    precio_por_kg: 5.50,
    categoria:    'Verduras',
    foto_url:     'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?w=400&h=300&fit=crop',
  },

  // ── Agricultor 3: Lácteos y Aceites ──────────────────────────────────────
  {
    agriIdx: 2,
    nombre:       'Queso Manchego',
    descripcion:  'Queso curado de oveja manchega D.O.',
    precio_por_kg: 18.00,
    categoria:    'Lacteos',
    foto_url:     'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&h=300&fit=crop',
  },
  {
    agriIdx: 2,
    nombre:       'Parmesano Artesano',
    descripcion:  'Queso parmesano curado 18 meses',
    precio_por_kg: 22.00,
    categoria:    'Lacteos',
    foto_url:     'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop',
  },
  {
    agriIdx: 2,
    nombre:       'Aceite de Oliva Virgen Extra',
    descripcion:  'AOVE de primera presión en frío, variedad Picual',
    precio_por_kg: 8.50,
    categoria:    'Aceites',
    foto_url:     'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop',
  },
]

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function ok(msg)   { console.log(`  ✅ ${msg}`) }
function warn(msg) { console.warn(`  ⚠️  ${msg}`) }
function fail(msg) { console.error(`  ❌ ${msg}`) }
function info(msg) { console.log(`\n── ${msg}`) }

// ─── SCRIPT PRINCIPAL ────────────────────────────────────────────────────────

async function reorganize() {
  console.log('🌱 Reorganización BD — FarmerHand\n')

  const PASSWORD = 'demo1234'
  const hash = await bcrypt.hash(PASSWORD, 10)

  // ── Paso 1: Crear/obtener los 3 usuarios agricultor ─────────────────────
  info('Creando usuarios agricultores...')
  const agriPerfiles = []   // [{id, email, agricultorId}]

  for (const agri of AGRICULTORES) {
    const { data: usuario, error } = await supabase
      .from('usuarios')
      .upsert([{
        nombre:        agri.nombre,
        email:         agri.email,
        password_hash: hash,
        rol:           'agricultor',
      }], { onConflict: 'email' })
      .select('id, email')
      .single()

    if (error) { fail(`Crear usuario ${agri.email}: ${error.message}`); continue }
    ok(`Usuario: ${usuario.email} (${usuario.id})`)

    // ── Paso 2: Crear/obtener el perfil agricultor ─────────────────────────
    const { data: perfilExistente } = await supabase
      .from('agricultores')
      .select('id')
      .eq('usuario_id', usuario.id)
      .maybeSingle()

    let agricultorId

    if (perfilExistente) {
      agricultorId = perfilExistente.id
      ok(`Perfil ya existe: ${agri.nombre_finca} (${agricultorId})`)
    } else {
      const { data: perfil, error: ep } = await supabase
        .from('agricultores')
        .insert([{
          usuario_id:   usuario.id,
          nombre_finca: agri.nombre_finca,
          localizacion: agri.localizacion,
          descripcion:  agri.descripcion,
          estado:       'aprobado',
        }])
        .select('id')
        .single()

      if (ep) { fail(`Crear perfil ${agri.nombre_finca}: ${ep.message}`); continue }
      agricultorId = perfil.id
      ok(`Perfil creado: ${agri.nombre_finca} (${agricultorId})`)
    }

    agriPerfiles.push({ ...agri, usuarioId: usuario.id, agricultorId })
  }

  if (agriPerfiles.length !== 3) {
    fail('No se pudieron crear los 3 agricultores. Revisa los errores arriba.')
    process.exit(1)
  }

  // ── Paso 3: Obtener productos existentes en BD ─────────────────────────
  info('Analizando productos existentes...')
  const { data: productosExistentes, error: eProd } = await supabase
    .from('productos')
    .select('id, nombre, categoria, agricultor_id')

  if (eProd) { fail(`Leer productos: ${eProd.message}`); process.exit(1) }
  ok(`Productos en BD: ${productosExistentes.length}`)

  // ── Paso 4: Distribuir/crear productos ────────────────────────────────
  info('Distribuyendo y creando productos...')

  const nombresEnBD = new Map(
    productosExistentes.map(p => [p.nombre.toLowerCase().trim(), p])
  )

  let actualizados = 0
  let insertados   = 0
  let errores      = 0

  for (const prod of PRODUCTOS) {
    const agriPerfil = agriPerfiles[prod.agriIdx]
    const key        = prod.nombre.toLowerCase().trim()
    const existente  = nombresEnBD.get(key)

    if (existente) {
      // Actualizar agricultor_id del producto existente
      const { error } = await supabase
        .from('productos')
        .update({ agricultor_id: agriPerfil.agricultorId })
        .eq('id', existente.id)

      if (error) {
        fail(`Actualizar "${prod.nombre}": ${error.message}`)
        errores++
      } else {
        ok(`Actualizado: "${prod.nombre}" → ${agriPerfil.nombre_finca}`)
        actualizados++
        nombresEnBD.delete(key)   // marcado como procesado
      }
    } else {
      // Insertar producto nuevo
      const { error } = await supabase
        .from('productos')
        .insert([{
          agricultor_id: agriPerfil.agricultorId,
          nombre:        prod.nombre,
          descripcion:   prod.descripcion,
          precio_por_kg: prod.precio_por_kg,
          categoria:     prod.categoria,
          disponible:    true,
          foto_url:      prod.foto_url,
        }])

      if (error) {
        fail(`Insertar "${prod.nombre}": ${error.message}`)
        errores++
      } else {
        ok(`Creado:    "${prod.nombre}" → ${agriPerfil.nombre_finca}`)
        insertados++
      }
    }
  }

  // ── Paso 5: Reasignar productos huérfanos que quedaron sin procesar ──────
  // (productos en BD que no coincidieron con ningún nombre del catálogo)
  const huerfanos = [...nombresEnBD.values()]
  if (huerfanos.length > 0) {
    info(`Reasignando ${huerfanos.length} producto(s) sin coincidencia de nombre...`)

    // Asignar por categoría, o al agricultor 1 si no hay coincidencia
    const mapaCategoria = {
      'Frutas':   agriPerfiles[0].agricultorId,
      'Verduras': agriPerfiles[1].agricultorId,
      'Lacteos':  agriPerfiles[2].agricultorId,
      'Aceites':  agriPerfiles[2].agricultorId,
    }

    for (const prod of huerfanos) {
      const destino = mapaCategoria[prod.categoria] || agriPerfiles[0].agricultorId
      const finca   = agriPerfiles.find(a => a.agricultorId === destino)?.nombre_finca ?? 'desconocida'

      const { error } = await supabase
        .from('productos')
        .update({ agricultor_id: destino })
        .eq('id', prod.id)

      if (error) {
        fail(`Reasignar "${prod.nombre}": ${error.message}`)
        errores++
      } else {
        warn(`Reasignado: "${prod.nombre}" (${prod.categoria}) → ${finca}`)
        actualizados++
      }
    }
  }

  // ── Resumen ───────────────────────────────────────────────────────────────
  console.log('\n' + '─'.repeat(50))
  console.log('✅ Reorganización completada')
  console.log(`   Productos actualizados: ${actualizados}`)
  console.log(`   Productos creados:      ${insertados}`)
  if (errores > 0)
    console.log(`   ❌ Errores:             ${errores}`)
  console.log('─'.repeat(50))
  console.log('\nCredenciales:')
  console.log('  agricultor1@farmerhand.com  / demo1234  → Frutas')
  console.log('  agricultor2@farmerhand.com  / demo1234  → Verduras')
  console.log('  agricultor3@farmerhand.com  / demo1234  → Lácteos/Aceites')
  console.log('  consumidor@farmerhand.com   / demo1234')
  console.log('  admin@farmerhand.com        / admin1234')
  process.exit(errores > 0 ? 1 : 0)
}

reorganize().catch(e => {
  console.error('❌ Error fatal:', e.message)
  process.exit(1)
})
