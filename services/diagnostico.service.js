import { client } from "../db.js";

const getDiagnosticos_service = async (idMedico) => {

    const result = await client.query(`
    SELECT diagnostico.* FROM diagnostico 
    INNER JOIN paciente
    ON diagnostico.id_paciente = paciente.id_paciente
    WHERE paciente.id_medico = $1`, [idMedico]);

}

const getDiagnostico_service = async (id) => {

    const result = await client.query(`
    SELECT * FROM diagnostico WHERE id_diag = $1`, [id]);

}

const createDiagnostico_service = async (foto, analisisIA, notas) => {

    const result = await client.query(`
    INSERT INTO diagnostico (foto, analisis_ia, notas) 
    VALUES ($1, $2, $3)`, [foto, analisisIA, notas]);

}

const deleteDiagnostico_service = async (id) => {

    const result = await client.query(`
    DELETE FROM diagnostico WHERE id_diag = $1`, [id]);

}

const updateDiagnostico_service = async (id, idPaciente) => {

    const result = await client.query(`
    UPDATE diagnostico SET id_paciente = $1 WHERE id_diag = $2`, [idPaciente, id]);

}

// const diagnosticoService = 
// {
//     getDiagnosticos_service,
//     getDiagnostico_service,
//     createDiagnostico_service, 
//     deleteDiagnostico_service, 
//     updateDiagnostico_service
// };

// export default diagnosticoService;