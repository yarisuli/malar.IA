import { client } from "../db.js";

const getPacientes = async (idMedico) => {
    try {
        const result = await client.query(`
            SELECT * FROM paciente WHERE id_medico = $1`, [idMedico]);
        return result;

    } catch (error) {
        console.error("Error al obtener los pacientes:", error);
        throw new Error("No se pudo obtener los pacientes.");
    }
};

const getPaciente = async (id) => {
    try {
        const result = await client.query(`
            SELECT * FROM paciente WHERE id_paciente = $1`, [id]);
        return result;

    } catch (error) {
        console.error("Error al obtener el paciente:", error);
        throw new Error("No se pudo obtener el paciente.");
    }
};

const createPaciente = async (nombre, apellido, nacimiento, sexo, dni, pais, ocupacion, numero, mail, instruccion, pfp, idMedico) => {
    try {
        const result = await client.query(`
            INSERT INTO paciente (nombre, apellido, nacimiento, sexo, dni, pais, ocupacion, numero, mail, instruccion, pfp, id_medico) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
            [nombre, apellido, nacimiento, sexo, dni, pais, ocupacion, numero, mail, instruccion, pfp, idMedico]); 
        return result;

    } catch (error) {
        console.error("Error al crear el paciente:", error);
        throw new Error("No se pudo crear el paciente.");
    }
};

const deletePaciente = async (id) => {
    try {
        const result = await client.query(`
            DELETE FROM paciente WHERE id_paciente = $1`, [id]); 
        return result;

    } catch (error) {
        console.error("Error al eliminar el paciente:", error);
        throw new Error("No se pudo eliminar el paciente.");
    }
};

const updatePaciente = async (id, nombre, apellido, nacimiento, sexo, dni, pais, ocupacion, numero, mail, instruccion, pfp) => {
    try {
        const result = await client.query(`
            UPDATE paciente SET nombre = $1, apellido = $2, nacimiento = $3, sexo = $4, dni = $5, pais = $6, ocupacion = $7, numero = $8, mail = $9, instruccion = $10, pfp = $11 
            WHERE id_paciente = $12;`, [nombre, apellido, nacimiento, sexo, dni, pais, ocupacion, numero, mail, instruccion, pfp, id]);
        return result;

    } catch (error) {
        console.error("Error al actualizar el paciente:", error);
        throw new Error("No se pudo actualizar el paciente.");
    }
};

const updateEstadoPaciente = async (idPaciente, estadoPaciente) => {
    try {
        const result = await client.query(
            `UPDATE paciente SET estado = $1 WHERE id_paciente = $2`,
            [estadoPaciente, idPaciente]);
        return result;

    } catch (error) {
        console.error("Error al asignar el estado del paciente:", error);
        throw new Error("No se pudo asignar el estado al paciente.");
    }
};


export default {
    getPacientes,
    getPaciente,
    createPaciente,
    deletePaciente,
    updatePaciente, 
    updateEstadoPaciente
};