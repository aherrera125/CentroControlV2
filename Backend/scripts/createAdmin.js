const bcrypt = require('bcrypt');

const createHash = async () => {

  const hash = await bcrypt.hash('Admin123!', 10);

  console.log('HASH GENERADO:');
  console.log(hash);

};

createHash();

//correr en backend y copiar hash generado en la db para el usuario admin, luego asignarle el rol de admin
//node scripts/createAdmin.js

//Insert user admin en la db
//insert into controlcenterv2.users (email, password, name, lastName, status) 
// values ('aherrera@centrocontrol.com.ar', '$2b$10$PjZy9MwkBCrxiTbF8D8uHOCDhbZlL2adzpUETjruAxWT8pMBK4rve', 'Alejandro', 'Herrera', 1);

//correr en db para asignar rol admin al usuario creado
//insert into controlcenterv2.user_role (userId, roleId) values (1, 1);

