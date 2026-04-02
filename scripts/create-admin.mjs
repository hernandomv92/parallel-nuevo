import { hashPassword } from '@evershop/evershop/src/lib/util/password.js';
import { pool } from '@evershop/evershop/src/lib/postgres/connection.js';
import { insert } from '@evershop/postgres-query-builder';

async function createAdmin() {
  // Tomamos los datos de los argumentos de la terminal
  const [,, fullName, email, password] = process.argv;

  if (!fullName || !email || !password) {
    console.error('❌ Error: Faltan argumentos.');
    console.log('Uso: node scripts/create-admin.mjs "Nombre" "email@ejemplo.com" "password123"');
    process.exit(1);
  }

  try {
    console.log(`Intentando crear usuario admin: ${email}...`);
    
    const passwordHash = await hashPassword(password);

    await insert('admin_user')
      .values({
        full_name: fullName,
        email: email,
        password: passwordHash,
        status: 1
      })
      .execute(pool);

    console.log('✅ ¡USUARIO ADMIN CREADO EXITOSAMENTE!');
    process.exit(0);
  } catch (error) {
    if (error.code === '23505') {
      console.error('❌ El usuario ya existe en la base de datos.');
    } else {
      console.error('❌ Error crítico:', error.message);
    }
    process.exit(1);
  }
}

createAdmin();
