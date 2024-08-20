import { client } from "../db.js";

const getDiagnosticos = async (req, res) => 
{
    const result = await client.query("SELECT * FROM diagnostico");
    res.json(result.rows); 
};

const getDiagnostico = async (req, res) => 
{
    const id = req.params.id;

    const result = await client.query("SELECT * FROM diagnostico WHERE id_diag = $1", [id]);
    res.json(result.rows); 
};

const createDiagnostico = async (req, res) => 
{
    const foto = req.body.foto;
    const analisisIA = req.body.analisisIA;
    const notas = req.body.notas;
    const nombrePaciente = req.body.nombrePaciente;

    const result = await client.query(`INSERT INTO diagnostico (foto, analisis_ia, notas, id_paciente)  
    VALUES ($1, $2, $3, (SELECT id_paciente FROM paciente WHERE paciente.nombre = $4))`, [foto, analisisIA, notas, nombrePaciente]);

    res.send("se creó el diagnóstico correctamente.");
};

const deleteDiagnostico = async (req, res) => 
{
    const id = req.params.id;
    
    const result = await client.query("DELETE FROM diagnostico WHERE id_diag = $1", [id]);
    
    res.send("se eliminó el diagnóstico correctamente.");
};

const updateDiagnostico = async (req, res) => 
{
    const id = req.params.id;
    const notas = req.body.notas;
        
    const result = await client.query("UPDATE diagnostico SET notas = $1 WHERE id_diag = $2", [notas, id]);
        
    res.send("se actualizó correctamente.");
};

const diagnostico = 
{
    getDiagnosticos,
    getDiagnostico,
    createDiagnostico, 
    deleteDiagnostico, 
    updateDiagnostico
};

export default diagnostico;