import { pool } from '@evershop/evershop/src/lib/postgres/connection.js';
import { execute } from '@evershop/postgres-query-builder';

async function fixStoreUrl() {
  const correctUrl = 'https://paralel.store';
  
  try {
    console.log('Intentando verificar y corregir la URL de la tienda en la base de datos...');
    
    // Check if the setting exists
    const result = await execute(
      pool,
      `SELECT * FROM setting WHERE name = 'shopConfig'`
    );

    let found = false;
    let currentValue = null;
    
    if (result.rows && result.rows.length > 0) {
      found = true;
      const row = result.rows[0];
      currentValue = row.value;
      console.log(`Configuración actual encontrada en DB. is_json: ${row.is_json}`);
      
      let parsedValue = {};
      try {
         parsedValue = JSON.parse(currentValue);
      } catch (e) {
         console.log('El valor actual no es un JSON válido:', currentValue);
      }
      
      console.log(`Valor actual en DB:`, parsedValue);

      if (parsedValue.storeUrl !== correctUrl) {
        parsedValue.storeUrl = correctUrl;
        
        await execute(
          pool,
          `UPDATE setting SET value = $1 WHERE name = 'shopConfig'`,
          [JSON.stringify(parsedValue)]
        );
        console.log(`✅ URL actualizada correctamente a ${correctUrl} en la base de datos.`);
      } else {
        console.log(`✅ La URL en la base de datos ya es correcta (${correctUrl}). No es necesario actualizar.`);
      }
    } else {
      console.log('No se encontró configuración shopConfig en la DB. Creándola...');
      await execute(
        pool,
        `INSERT INTO setting (name, value, is_json) VALUES ('shopConfig', $1, true)`,
        [JSON.stringify({ storeUrl: correctUrl })]
      );
      console.log(`✅ URL insertada correctamente como ${correctUrl} en la base de datos.`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error actualizando la base de datos:', error.message);
    process.exit(1);
  }
}

fixStoreUrl();