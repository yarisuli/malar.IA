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
            SELECT diagnostico.*, paciente.nombre, paciente.apellido 
            FROM diagnostico INNER JOIN paciente ON paciente.id_paciente = diagnostico.id_paciente
            WHERE id_diag = $1`, [id]);
        return result;

    } catch (error) {
        console.error("Error al obtener el diagnóstico:", error);
        throw new Error("Error al ejecutar la consulta en la base de datos.");
    }
};

const getIdDiagnostico = async (imageUrl) => {
    try {
        const result = await client.query(`
            SELECT id_diag FROM diagnostico WHERE foto = $1
        `, [imageUrl]);
        return result;

    } catch (error) {
        console.error("Error al obtener el ID del diagnóstico:", error);
        throw new Error("Error al ejecutar la consulta en la base de datos.");
    }
};

const getImagenDiagnostico = async (idDiag) => {
    try {
        const result = await client.query(`
            SELECT foto FROM diagnostico WHERE id_diag = $1`, [idDiag]);
        return result;

    } catch (error) {
        console.error("Error al obtener la imagen del diagnóstico:", error);
        throw new Error("Error al ejecutar la consulta en la base de datos.");
    }
};

const getResultadoDiagnostico = async (idDiag) => {
    try {
        const result = await client.query(`
            SELECT analisis_ia FROM diagnostico WHERE id_diag = $1`, [idDiag]);
        return result;

    } catch (error) {
        console.error("Error al obtener la imagen del diagnóstico:", error);
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

const updatePacienteDiagnostico = async (idDiag, idPaciente) => {
    try {
        const result = await client.query(`
            UPDATE diagnostico SET id_paciente = $1 WHERE id_diag = $2`, [idPaciente, idDiag]);
        return result;

    } catch (error) {
        console.error("Error al asignar diagnóstico al paciente:", error);
        throw new Error("No se pudo actualizar el diagnóstico.");
    }
};

const updateNotasDiagnostico = async (id, notas) => {
    try {
        const result = await client.query(`
            UPDATE diagnostico SET notas = $1 WHERE id_diag = $2`, [notas, id]);
        return result;

    } catch (error) {
        console.error("Error al asignar las notas al diagnostico:", error);
        throw new Error("No se pudo actualizar el diagnóstico.");
    }
};

const postImagen = async (idMedico, imageUrl, fechaAnalisis, data) => {
    try {
        const result = await client.query(`
            INSERT INTO diagnostico (analisis_ia, id_medico, foto, fecha_analisis) VALUES ($1, $2, $3, $4)`, [data, idMedico, imageUrl, fechaAnalisis]);
        return result;

    } catch (error) {
        console.error("Error al guardar diagnostico:", error);
        throw new Error("No se pudo guardar el diagnostico.");
    }
};

export default {
    getDiagnostico,
    getMedicoDiagnosticos,
    createDiagnostico,
    deleteDiagnostico,
    updatePacienteDiagnostico, 
    postImagen,
    getIdDiagnostico,
    getImagenDiagnostico,
    updateNotasDiagnostico,
    getResultadoDiagnostico
}