import { client } from "../db.js";

const getMedicoDiagnosticos = async (idMedico) => {
    try {
        const result = await client.query(`
            SELECT diagnostico.* FROM diagnostico WHERE id_medico = $1`, [idMedico]);
        return result;

    } catch (error) {
        console.error("Error al obtener los diagnósticos del médico:", error);
        throw new Error("No se pudo obtener los diagnósticos del médico.");
    }
};

const getDiagnostico = async (id) => {
    try {
        const result = await client.query(`
            SELECT * FROM diagnostico WHERE id_diag = $1`, [id]);
        return result;

    } catch (error) {
        console.error("Error al obtener el diagnóstico:", error);
        throw new Error("Error al ejecutar la consulta en la base de datos.");
    }
};

const createDiagnostico = async (analisisIA, notas, idPaciente, idMedico, fechaAnalisis) => {
    try {
        const result = await client.query(`
            INSERT INTO diagnostico (analisis_ia, notas, id_paciente, id_medico, fechaAnalisis) 
            VALUES ($1, $2, $3, $4, $5)`, [analisisIA, notas, idPaciente, idMedico, fechaAnalisis]);
        return result;

    } catch (error) {
        console.error("Error al crear el diagnóstico:", error);
        throw new Error("No se pudo crear el diagnóstico.");
    }
};

const deleteDiagnostico = async (id) => {
    try {
        const result = await client.query(`
            DELETE FROM diagnostico WHERE id_diag = $1`, [id]);
        return result;

    } catch (error) {
        console.error("Error al eliminar el diagnóstico:", error);
        throw new Error("No se pudo eliminar el diagnóstico.");
    }
};

const updateDiagnostico = async (id, idPaciente) => {
    try {
        const result = await client.query(`
            UPDATE diagnostico SET id_paciente = $1 WHERE id_diag = $2`, [idPaciente, id]);
        return result;

    } catch (error) {
        console.error("Error al actualizar el diagnóstico:", error);
        throw new Error("No se pudo actualizar el diagnóstico.");
    }
};

const postImagen = async (idMedico, imageUrl) => {
    try {
        const result = await client.query(`
            INSERT INTO diagnostico (id_medico, foto) VALUES ($1, $2)`, [idMedico, imageUrl]);
        return result;

    } catch (error) {
        console.error("Error al insertar la imagen:", error);
        throw new Error("No se pudo insertar la imagen.");
    }
};


export default {
    getDiagnostico,
    getMedicoDiagnosticos,
    createDiagnostico,
    deleteDiagnostico,
    updateDiagnostico, 
    postImagen
}