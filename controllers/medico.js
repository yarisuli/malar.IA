import { client } from "../db.js";

const getMedico = async (req, res) => 
    {
    const res = await client.query("SELECT * FROM medico");
    console.log(res.rows); 
    };

// const tipoQuery2 = async (req, res) => {
    
//     const valor1 = req.params.id;
//     const valor2 = req.body.nombre;

//     await client.query("INSERT INTO <nombre_tabla> (columna1, columna2) VALUES ($1, $2)", [valor1, valor2]); 
//     //$X = al ?, o sea, va a ser reemplazado por valorX
// };

const medicos = {
    getMedico,
    //tipoQuery2
};

export default medicos;