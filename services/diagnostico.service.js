import { client } from "../db.js";

const getMedicoDiagnosticos = async (idMedico) => {

    const result = await client.query(`
    SELECT diagnostico.* FROM diagnostico 
    INNER JOIN paciente
    ON diagnostico.id_paciente = paciente.id_paciente
    WHERE paciente.id_medico = $1`, [idMedico]);

    return result;

}

const getDiagnostico = async (id) => {

    const result = await client.query(`
    SELECT * FROM diagnostico WHERE id_diag = $1`, [id]);

    return result;

}

const createDiagnostico = async (foto, analisisIA, notas, idPaciente) => {

    const result = await client.query(`
    INSERT INTO diagnostico (foto, analisis_ia, notas, id_paciente) 
    VALUES ($1, $2, $3, $4)`, [foto, analisisIA, notas, idPaciente]);

    return result;

}

const deleteDiagnostico = async (id) => {

    const result = await client.query(`
    DELETE FROM diagnostico WHERE id_diag = $1`, [id]);

    return result;

}

const updateDiagnostico = async (id, idPaciente) => {

    const result = await client.query(`
    UPDATE diagnostico SET id_paciente = $1 WHERE id_diag = $2`, [idPaciente, id]);

    return result;

}

export default {
    getDiagnostico,
    getMedicoDiagnosticos,
    createDiagnostico,
    deleteDiagnostico,
    updateDiagnostico
}