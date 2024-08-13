import { client } from "../db.js";

const getPaciente = async (req, res) => 
    {
    const res = await client.query("SELECT * FROM paciente");
    console.log(res.rows); 
    };

const createPaciente = async (req, res) => {
    
const nombre = req.body.nombre;
const apellido = req.body.apellido;
const nacimiento = req.body.date;
const estado = req.body.estado;
const mail = req.body.mail;
const pfp = req.body.pfp;
const idMedico = req.params.idMedico; //chequear como es que REST consigue data de bdd

await client.query(`
INSERT INTO paciente (nombre, apellido, nacimiento, estado, mail, pfp, id_medico)
VALUES ($1, $2, $3, $4, $5, $6, $7)`, [nombre, apellido, nacimiento, estado, mail, pfp, idMedico]); 
//$X = al ?, o sea, va a ser reemplazado por valorX
};

const pacientes = {
    getPaciente,
    createPaciente,
};

export default pacientes;