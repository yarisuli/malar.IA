import { client } from "../db.js";

const getPacientes = async (req, res) => 
{
    const res = await client.query("SELECT * FROM paciente");
    console.log(res.rows); 
};

const getPaciente = async (req, res) => 
{
    const pacienteId = req.params.pacienteId;
    
    const res = await client.query("SELECT * FROM paciente WHERE id_paciente = $1", [medicoId]);
    console.log(res.rows); 
};

const createPaciente = async (req, res) => {
    
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const nacimiento = req.body.date;
    const estado = req.body.estado;
    const mail = req.body.mail;
    const pfp = req.body.pfp;
    const nombreMedico = req.body.nombreMedico; //chequear como es que REST consigue data de bdd

    await client.query(`
    INSERT INTO paciente (nombre, apellido, nacimiento, estado, mail, pfp, id_medico)
    VALUES ($1, $2, $3, $4, $5, $6, (SELECT id_medico FROM medico WHERE medico.nombre = $7))`, [nombre, apellido, nacimiento, estado, mail, pfp, nombreMedico]); 

    res.send("se creó el paciente correctamente.");
};

const deletePaciente = async (req, res) => 
{
    const pacienteId = req.params.pacienteId;
        
    const res = await client.query("DELETE FROM paciente WHERE id_paciente = $1", [pacienteId]); 

    res.send("se eliminó el paciente correctamente.");
};

const updatePaciente = async (req, res) => 
    {
        const pacienteId = req.params.pacienteId;
        const mail = req.body.mail;
        
        const res = await client.query("UPDATE paciente SET mail = $1 WHERE id_diag = $2", [mail, pacienteId]);
        
        res.send("se actualizó correctamente.");
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