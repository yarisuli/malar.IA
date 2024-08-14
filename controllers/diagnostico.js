 import { client } from "../db.js";

const getDiagnosticos = async (req, res) => 
{
    const res = await client.query("SELECT * FROM diagnostico");
    console.log(res.rows); 
};

const getDiagnostico = async (req, res) => 
{
    const diagnosticoId = req.params.diagnosticoId;

    const res = await client.query("SELECT * FROM diagnostico WHERE id_diag = $1", [diagnosticoId]);
    console.log(res.rows); 
};

const createDiagnostico = async (req, res) => 
{
    const foto = req.body.foto;
    const analisisIA = req.body.analisisIA;
    const notas = req.body.notas;
    const nombrePaciente = req.body.nombrePaciente;

    await client.query(`INSERT INTO diagnostico (foto, analisis_ia, notas, id_paciente)  
    VALUES ($1, $2, $3, (SELECT id_paciente FROM paciente WHERE paciente.nombre = $4))`, [foto, analisisIA, notas, nombrePaciente]);

    res.send("se creó el diagnóstico correctamente.");
};

const eliminarDiagnostico = async (req, res) => 
{
    const diagnosticoId = req.params.diagnosticoId;
    
    const res = await client.query("DELETE FROM diagnostico WHERE id_diag = $1", [diagnosticoId]);
    
    res.send("se eliminó el diagnóstico correctamente.");
};

const updateDiagnostico = async (req, res) => 
    {
        const diagnosticoId = req.params.diagnosticoId;
        const notas = req.body.notas;
        
        const res = await client.query("UPDATE diagnostico SET notas = $1 WHERE id_diag = $2", [notas, diagnosticoId]);
        
        res.send("se actualizó correctamente.");
    };



const diagnostico = 
{
    getDiagnosticos,
    getDiagnostico,
    createDiagnostico, 
    eliminarDiagnostico, 
    updateDiagnostico
};

export default diagnostico;