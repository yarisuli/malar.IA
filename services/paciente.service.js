import { client } from "../db.js";

const getPacientes = async (idMedico) => {

    const result = await client.query(`
    SELECT * FROM paciente WHERE id_medico = $1`, [idMedico]);

    return result;

}

const getPaciente = async (id) => {

    const result = await client.query(`
    SELECT * FROM paciente WHERE id_paciente = $1`, [id]);

    return result;

}

const createPaciente = async (nombre, apellido, nacimiento, sexo, dni, pais, ocupacion, numero, mail, instruccion, pfp, idMedico) => {

    const result = await client.query(`
    INSERT INTO paciente (nombre, apellido, nacimiento, sexo, dni, pais, ocupacion, numero, mail, instruccion, pfp, id_medico) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
    [nombre, apellido, nacimiento, sexo, dni, pais, ocupacion, numero, mail, instruccion, pfp, idMedico]); 

    return result;

}

const deletePaciente = async (id) => {

    const result = await client.query(`
    DELETE FROM paciente WHERE id_paciente = $1`, [id]); 

    return result;

}

const updatePaciente = async (id, nacimiento) => {

    const result = await client.query(`
    UPDATE paciente SET nacimiento = $1 WHERE id_paciente = $2`, [nacimiento, id]);

    return result;

}

export default {
    getPacientes,
    getPaciente,
    createPaciente,
    deletePaciente,
    updatePaciente
};