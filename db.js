// import { Client } from "pg"; 

// export const client = new Client({
//     user: "default",
//     host: "ep-round-sun-a4typ0hh-pooler.us-east-1.aws.neon.tech",
//     database: "verceldb",
//     password: "mCH7yXizT2LV",
//     port: 5432,
// });

// client.connect(); 


import pkg from 'pg';
const { Client } = pkg;

 export const client = new Client({
    user: "default",
    host: "ep-round-sun-a4typ0hh-pooler.us-east-1.aws.neon.tech",
    database: "verceldb",
    password: "mCH7yXizT2LV",
    port: 5432,
    ssl: {
         rejectUnauthorized: false
     }
 });

client.connect()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error al conectar a la base de datos', err));
