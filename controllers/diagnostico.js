// import { client } from "../db.js";

// const tipoQuery1 = async (req, res) => {

//     const result = await client.query("SELECT * FROM <nombre_tabla>");
//     console.log(result.rows);
// };

// const tipoQuery2 = async (req, res) => {

//     const valor1 = req.params.id;
//     const valor2 = req.body.nombre;


//     await client.query("INSERT INTO <nombre_tabla> (columna1, columna2) VALUES ($1, $2)", [valor1, valor2]);
//     //$X = al ?, o sea, va a ser reemplazado por valorX
// };

const diagnostico = {
//     tipoQuery1,
//     tipoQuery2
};

export default diagnostico;