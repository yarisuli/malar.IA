import { client } from "../db.js";

const getDiagnosticos = async (req, res) => 
{   
    const idMedico = req.params.idMedico; //EL ID MEDICO LO TIENE QUE AGARRAR DEL ID DEL MEDICO QUE INICIO SESION

    const result = await client.query
    (`SELECT diagnostico.* FROM diagnostico 
    INNER JOIN paciente
    ON diagnostico.id_paciente = paciente.id_paciente
    WHERE paciente.id_medico = $1`, [idMedico]);

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

    const result = await client.query(`INSERT INTO diagnostico (foto, analisis_ia, notas)  
    VALUES ($1, $2, $3)`, [foto, analisisIA, notas]);

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
    const idPaciente = req.body.idPaciente;

    const result = await client.query("UPDATE diagnostico SET id_paciente = $1 WHERE id_diag = $2", [idPaciente, id]);

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