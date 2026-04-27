require('dotenv').config()
  const bcrypt = require('bcrypt')
  const { createClient } = require('@supabase/supabase-js')

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

  async function seed() {
      console.log('🌱 Iniciando seed...')

      // 1. Crear usuario admin
      const password_hash = await bcrypt.hash('admin1234', 10)

      const { data: admin, error: errorAdmin } = await supabase
          .from('usuarios')
          .upsert([{
              nombre: 'Admin FarmerHand',
              email: 'admin@farmerhand.com',
              password_hash,
              rol: 'admin'
          }], { onConflict: 'email' })
          .select()
          .single()

      if (errorAdmin) {
          console.error('❌ Error creando admin:', errorAdmin.message)
      } else {
          console.log('✅ Admin creado:', admin.email)
      }

      // 2. Crear usuario agricultor de demo (ya aprobado)
      const hash2 = await bcrypt.hash('demo1234', 10)

      const { data: usuarioAgri, error: errorUsuario } = await supabase
          .from('usuarios')
          .upsert([{
              nombre: 'María García',
              email: 'agricultor@farmerhand.com',
              password_hash: hash2,
              rol: 'agricultor'
          }], { onConflict: 'email' })
          .select()
          .single()

      if (errorUsuario) {
          console.error('❌ Error creando agricultor:', errorUsuario.message)
      } else {
          console.log('✅ Agricultor demo creado:', usuarioAgri.email)

          // Crear perfil de agricultor aprobado (con comprobación previa)
          const { data: perfilExistente } = await supabase
              .from('agricultores')
              .select('id')
              .eq('usuario_id', usuarioAgri.id)
              .maybeSingle()

          if (perfilExistente) {
              console.log('ℹ️  Perfil agricultor ya existe, omitiendo')
          } else {
              const { error: errorPerfil } = await supabase
                  .from('agricultores')
                  .insert([{
                      usuario_id: usuarioAgri.id,
                      nombre_finca: 'Huerta La Vega',
                      localizacion: 'Murcia, España',
                      descripcion: 'Finca ecológica familiar con 20 años de experiencia',
                      estado: 'aprobado'
                  }])

              if (errorPerfil) {
                  console.error('❌ Error creando perfil agricultor:', errorPerfil.message)
              } else {
                  console.log('✅ Perfil agricultor aprobado')
              }
          }
      }

      // 3. Crear usuario consumidor de demo
      const hash3 = await bcrypt.hash('demo1234', 10)

      const { error: errorConsumidor } = await supabase
          .from('usuarios')
          .upsert([{
              nombre: 'Carlos López',
              email: 'consumidor@farmerhand.com',
              password_hash: hash3,
              rol: 'consumidor'
          }], { onConflict: 'email' })

      if (errorConsumidor) {
          console.error('❌ Error creando consumidor:', errorConsumidor.message)
      } else {
          console.log('✅ Consumidor demo creado')
      }

      // 4. Crear productos de demo (necesita agricultor aprobado)
      const { data: agri } = await supabase
          .from('agricultores')
          .select('id')
          .eq('estado', 'aprobado')
          .limit(1)
          .single()

      if (agri) {
          const { data: productosExistentes } = await supabase
              .from('productos')
              .select('id')
              .eq('agricultor_id', agri.id)

          if (productosExistentes?.length) {
              console.log('ℹ️  Productos ya existen, omitiendo')
          } else {
              const { error: errorProductos } = await supabase
                  .from('productos')
                  .insert([
                      {
                          agricultor_id: agri.id,
                          nombre: 'Tomates de huerta',
                          descripcion: 'Tomates maduros recogidos a mano',
                          precio_por_kg: 3.50,
                          categoria: 'Verduras',
                          disponible: true,
                          foto_url: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=300&fit=crop'
                      },
                      {
                          agricultor_id: agri.id,
                          nombre: 'Pimientos rojos',
                          descripcion: 'Pimientos ecológicos de temporada',
                          precio_por_kg: 4.20,
                          categoria: 'Verduras',
                          disponible: true,
                          foto_url: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=300&fit=crop'
                      },
                      {
                          agricultor_id: agri.id,
                          nombre: 'Naranjas Valencia',
                          descripcion: 'Naranjas frescas de Valencia',
                          precio_por_kg: 2.80,
                          categoria: 'Frutas',
                          disponible: true,
                          foto_url: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=300&fit=crop'
                      }
                  ])

              if (errorProductos) {
                  console.error('❌ Error creando productos:', errorProductos.message)
              } else {
                  console.log('✅ Productos demo creados')
              }


            }
      }

      console.log('\n✅ Seed completado')
      console.log('─────────────────────────────')
      console.log('admin@farmerhand.com       / admin1234')
      console.log('agricultor@farmerhand.com  / demo1234')
      console.log('consumidor@farmerhand.com  / demo1234')
      console.log('─────────────────────────────')
      process.exit(0)
  }

  seed()