import { client } from "../db.js";

const getMedicos = async (req, res) => 
{
    const result = await client.query("SELECT * FROM medico");
    res.json(result.rows); 
};

const getMedico = async (req, res) => 
{
    const id = req.params.id;

    const result = await client.query("SELECT * FROM medico WHERE id_medico = $1", [id]);
    res.json(result.rows); 
};

const createMedico = async (req, res) => 
{
    const mail = req.body.mail;
    const telefono = req.body.telefono;
    const contra = req.body.contra;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const pfp = req.body.pfp;

    const result = await client.query(`INSERT INTO medico (mail, telefono, contra, nombre, apellido, pfp)
    VALUES ($1, $2, $3, $4, $5, $6)`, [mail, telefono, contra, nombre, apellido, pfp]); 

    res.send("Se creó el usuario correctamente.");
};

const deleteMedico = async (req, res) => 
{
    const id = req.params.id;

    const result = await client.query("DELETE FROM medico WHERE id_medico = $1", [id]);

    res.send("Se eliminó el usuario correctamente.");
};

const updateMedico = async (req, res) => 
{
    const id = req.params.id;
    const mail = req.body.mail;

    const result = await client.query("UPDATE medico SET mail = $1 WHERE id_medico = $2", [mail, id]);

    res.send("Se actualizó el usuario correctamente.");
    };
const medico =
{
    getMedicos,
    getMedico,
    createMedico, 
    deleteMedico,
    updateMedico
};

export default medico;