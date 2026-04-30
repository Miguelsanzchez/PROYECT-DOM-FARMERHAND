require('dotenv').config({ path: require('path').join(__dirname, '.env') })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

async function diagnostico() {
  console.log('\n🔍 DIAGNÓSTICO FARMERHAND — USUARIOS EN BD\n')
  console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ configurada' : '❌ FALTA')
  console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY ? '✅ configurada' : '❌ FALTA')
  console.log('JWT_SECRET:  ', process.env.JWT_SECRET   ? '✅ configurado' : '❌ FALTA')
  console.log('')

  const { data, error } = await supabase
    .from('usuarios')
    .select('id, nombre, email, rol, created_at')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('❌ Error consultando usuarios:', error.message)
    process.exit(1)
  }

  if (!data || data.length === 0) {
    console.log('⚠️  La tabla usuarios está VACÍA — el seed no se ha ejecutado o falló.\n')
  } else {
    console.log(`✅ ${data.length} usuario(s) en BD:\n`)
    console.log('Email'.padEnd(35), 'Rol'.padEnd(12), 'Nombre')
    console.log('─'.repeat(70))
    data.forEach(u => {
      console.log(u.email.padEnd(35), u.rol.padEnd(12), u.nombre)
    })
  }

  const esperados = [
    'admin@farmerhand.com',
    'user1@farmerhand.com',
    'user2@farmerhand.com',
    'farmer1@farmerhand.com',
    'agricultor@farmerhand.com',
    'consumidor@farmerhand.com',
  ]
  const existentes = (data || []).map(u => u.email)

  console.log('\n📋 EMAILS ESPERADOS vs EXISTENTES:')
  esperados.forEach(email => {
    const existe = existentes.includes(email)
    console.log(existe ? `  ✅ ${email}` : `  ❌ ${email}  ← NO EXISTE`)
  })

  console.log('')
  process.exit(0)
}

diagnostico()
