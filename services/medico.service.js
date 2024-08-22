import { client } from "../db.js";

//NO SIRVE PARA WEB, SIRVE PARA MI
const getMedicos = async () => {

    const result = await client.query(`
    SELECT * FROM medico`);

    return result;

}

const getMedico = async (id) => {

    const result = await client.query(`
    SELECT * FROM medico WHERE id_medico = $1`, [id]);

    return result;

}

const createMedico = async (mail, telefono, contra, nombre, apellido, pfp) => {

    const result = await client.query(`
    INSERT INTO medico (mail, telefono, contra, nombre, apellido, pfp)
    VALUES ($1, $2, $3, $4, $5, $6)`, [mail, telefono, contra, nombre, apellido, pfp]); 

    return result;

}

const deleteMedico = async (id) => {

    const result = await client.query(`
    DELETE FROM medico WHERE id_medico = $1`, [id]);

    return result;

}

const updateMedico = async (id, mail) => {

    const result = await client.query(`
    UPDATE medico SET mail = $1 WHERE id_medico = $2`, [mail, id]);

    return result;

}

export default {
    getMedicos,
    getMedico,
    createMedico, 
    deleteMedico,
    updateMedico
};