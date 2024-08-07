import { Client } from "pg"; // Importamos el cliente de pg (recordar que para utilizar 'import' es necesario usar "type": "module" en el package.json)

// Pueden (y deberían) utilizar variables de entorno para almacenar los datos de conexión (dotenv)
export const client = new Client({
    user: "default",
    host: "ep-round-sun-a4typ0hh-pooler.us-east-1.aws.neon.tech",
    database: "verceldb",
    password: "mCH7yXizT2LV",
    port: 5432,
});

client.connect(); // Nos conectamos a la base de datos