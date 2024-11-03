import { client } from "../db.js";

const getMedicoDiagnosticos = async (idMedico) => {

    const result = await client.query(`
    SELECT diagnostico.* FROM diagnostico WHERE id_medico = $1`, [idMedico]);

    return result;

}

const getDiagnostico = async (id) => {
    try {
        const result = await client.query(`
            SELECT * FROM diagnostico WHERE id_diag = $1`, [id]);

        return result;

    } catch (error) {
        console.error("Error al obtener el diagnóstico:", error);
        throw new Error("Error al ejecutar la consulta en la base de datos");
    }
};

const createDiagnostico = async (analisisIA, notas, idPaciente, idMedico) => {

    const result = await client.query(`
    INSERT INTO diagnostico (analisis_ia, notas, id_paciente, id_medico) 
    VALUES ($1, $2, $3, $4)`, [analisisIA, notas, idPaciente, idMedico]);
    
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

const postImagen = async (idMedico, imageUrl) => {
    const result = await client.query(
    `INSERT INTO diagnostico (id_medico, foto) VALUES ($1, $2)`, [idMedico, imageUrl]);

    return result;
}

export default {
    getDiagnostico,
    getMedicoDiagnosticos,
    createDiagnostico,
    deleteDiagnostico,
    updateDiagnostico, 
    postImagen
}