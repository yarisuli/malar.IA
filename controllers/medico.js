import { client } from "../db.js";

const getMedicos = async (req, res) => 
{
    const res = await client.query("SELECT * FROM medico");
    console.log(res.rows); 
};

const getMedico = async (req, res) => 
{
    const medicoId = req.params.medicoId;

    const res = await client.query("SELECT * FROM medico WHERE id_medico = $1", [medicoId]);
    console.log(res.rows); 
};

const createMedico = async (req, res) => 
{
    const mail = req.body.mail;
    const telefono = req.body.telefono;
    const contra = req.body.contra;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const pfp = req.body.pfp;

    await client.query(`INSERT INTO medico (mail, telefono, contra, nombre, apellido, pfp)
    VALUES ($1, $2, $3, $4, $5, $6)`, [mail, telefono, contra, nombre, apellido, pfp]); 

    res.send("se creó el usuario correctamente.");
};

const deleteMedico = async (req, res) => 
{
    const medicoId = req.params.medicoId;

    const res = await client.query("DELETE FROM medico WHERE id_medico = $1", [medicoId]);

    res.send("se eliminó el usuario correctamente.");
};

const updateMedico = async (req, res) => 
    {
        const medicoId = req.params.medicoId;
        const mail = req.body.mail;
        
        const res = await client.query("UPDATE medico SET mail = $1 WHERE id_diag = $2", [mail, medicoId]);
        
        res.send("se actualizó correctamente.");
    };
const medicos =
{
    getMedicos,
    getMedico,
    createMedico, 
    deleteMedico,
    updateMedico
};

export default medicos;