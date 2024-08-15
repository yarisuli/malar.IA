import { client } from "../db.js";

const getPacientes = async (req, res) => 
{
    const result = await client.query("SELECT * FROM paciente");
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
    const estado = req.body.estado;
    const mail = req.body.mail;
    const pfp = req.body.pfp;
    const nombreMedico = req.body.nombreMedico; 

    const result = await client.query(`
    INSERT INTO paciente (nombre, apellido, nacimiento, estado, mail, pfp, id_medico)
    VALUES ($1, $2, $3, $4, $5, $6, (SELECT id_medico FROM medico WHERE medico.nombre = $7))`, [nombre, apellido, nacimiento, estado, mail, pfp, nombreMedico]); 

    res.send("se creó el paciente correctamente.");
};

const deletePaciente = async (req, res) => 
{
    const id = req.params.id;
        
    const result = await client.query("DELETE FROM paciente WHERE id_paciente = $1", [id]); 

    res.send("se eliminó el paciente correctamente.");
};

const updatePaciente = async (req, res) => 
    {
        const id = req.params.id;
        const nacimiento = req.body.nacimiento;
        
        const result = await client.query("UPDATE paciente SET nacimiento = $1 WHERE id_paciente = $2", [nacimiento, id]);
        
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