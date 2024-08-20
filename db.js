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

    // import pg from 'pg';

// const { Pool } = pg;

// const pool = new Pool({
//     // user: process.env.POSTGRES_USER,
//     // host: process.env.POSTGRES_HOST,
//     // database: process.env.POSTGRES_DATABASE,
//     // password: process.env.POSTGRES_PASSWORD,
//     // port: 5432,
//     connectionString: process.env.POSTGRES_URL
// });

// pool.connect((err)=> {
//     if (err) throw err
//     console.log("Se conectó a la base de datos.")
// });

// module.exports = pool;