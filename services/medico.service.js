import { client } from "../db.js";

//NO SIRVE PARA WEB, SIRVE PARA MI
const getMedicos_service = async () => {

    const result = await client.query(`
    SELECT * FROM medico`);

}

const getMedico_service = async (id) => {

    const result = await client.query(`
    SELECT * FROM medico WHERE id_medico = $1`, [id]);

}

const createMedico_service = async (mail, telefono, contra, nombre, apellido, pfp) => {
    
    const result = await client.query(`
    INSERT INTO medico (mail, telefono, contra, nombre, apellido, pfp)
    VALUES ($1, $2, $3, $4, $5, $6)`, [mail, telefono, contra, nombre, apellido, pfp]); 

}

const deleteMedico_service = async (id) => {

    const result = await client.query(`
    DELETE FROM medico WHERE id_medico = $1`, [id]);

}

const updateMedico_service = async (id, mail) => {

    const result = await client.query(`
    UPDATE medico SET mail = $1 WHERE id_medico = $2`, [mail, id]);

}