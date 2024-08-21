import { client } from "../db.js";

const getDiagnosticos = async (req, res) => 
{   
    const idMedico = req.params.idMedico; //EL ID MEDICO LO TIENE QUE AGARRAR DEL ID DEL MEDICO QUE INICIO SESION

    const result = await client.query("SELECT * FROM diagnostico WHERE id_medico = $1", [idMedico]);

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

    res.send("Se creó el diagnóstico correctamente.");
};

const deleteDiagnostico = async (req, res) => 
{
    const id = req.params.id;

    const result = await client.query("DELETE FROM diagnostico WHERE id_diag = $1", [id]);

    res.send("Se eliminó el diagnóstico correctamente.");
};

const updateDiagnostico = async (req, res) => 
{
    const id = req.params.id;
    const notas = req.body.notas;

    const result = await client.query("UPDATE diagnostico SET notas = $1 WHERE id_diag = $2", [notas, id]);

    res.send("Se actualizó el diagnóstico correctamente.");
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