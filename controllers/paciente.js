import { client } from "../db.js";

const getPacientes = async (req, res) => 
{
    const idMedico = req.params.idMedico; //EL ID MEDICO LO TIENE QUE AGARRAR DEL ID DEL MEDICO QUE INICIO SESION

    const result = await client.query("SELECT * FROM paciente WHERE id_medico = $1", [idMedico]);

    res.json(result.rows); 
};

const getPaciente = async (req, res) => 
{
    const id = req.params.id;

    const result = await client.query("SELECT * FROM paciente WHERE id_paciente = $1", [id]);

    res.json(result.rows); 
};

const createPaciente = async (req, res) => {

    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const nacimiento = req.body.nacimiento;
    const pais = req.body.pais;
    const genero = req.body.genero;
    const estado = req.body.estado;
    const mail = req.body.mail;
    const pfp = req.body.pfp;
    const nombreMedico = req.body.nombreMedico; 

    const result = await client.query(`
    INSERT INTO paciente (nombre, apellido, nacimiento, pais, genero, estado, mail, pfp, id_medico)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8 (SELECT id_medico FROM medico WHERE medico.nombre = $9))`,
    [nombre, apellido, nacimiento, estado, pais, genero, mail, pfp, nombreMedico]); 

    res.send("Se creó el paciente correctamente.");
};

const deletePaciente = async (req, res) => 
{
    const id = req.params.id;

    const result = await client.query("DELETE FROM paciente WHERE id_paciente = $1", [id]); 

    res.send("Se eliminó el paciente correctamente.");
};

const updatePaciente = async (req, res) => 
{
    const id = req.params.id;
    const nacimiento = req.body.nacimiento;

    const result = await client.query("UPDATE paciente SET nacimiento = $1 WHERE id_paciente = $2", [nacimiento, id]);

    res.send("Se actualizó el paciente correctamente.");
};

const paciente = 
{
    getPacientes,
    getPaciente,
    createPaciente,
    deletePaciente,
    updatePaciente
};

export default paciente;