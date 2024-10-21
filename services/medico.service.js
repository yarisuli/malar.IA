import { client } from "../db.js";

//NO SIRVE PARA WEB, SIRVE PARA MI
const getMedicos = async () => {
    try {
        const result = await client.query(`
        SELECT * FROM medico`);

        return result;
    } catch (error) {
        console.error('Error al obtener la lista de médicos:', error);

        throw new Error('Error al obtener la lista de médicos desde la base de datos');
    }
};


const getMedicoById = async (id) => {
    try {
        const result = await client.query(`
        SELECT * FROM medico WHERE id_medico = $1`, [id]);

        if (result && result.rows) {
            return result;  
        }

        return { rows: [] };
    } catch (error) {
        console.error('Error en la consulta de la base de datos:', error);
        throw error; 
    }
};

const getMedicoByMail = async (mail) => {
    try {
        const result = await client.query(`
        SELECT * FROM medico WHERE mail = $1`, [mail]);

        if (result.rows.length < 1) return null;
        
        return result.rows[0]; 

    } catch (error) {
        throw error;
    }
};

const createMedico = async (mail, telefono, contra, nombre, apellido, pfp) => {
    try {
        const result = await client.query(`
        INSERT INTO medico (mail, telefono, contra, nombre, apellido, pfp)
        VALUES ($1, $2, $3, $4, $5, $6)`, [mail, telefono, contra, nombre, apellido, pfp]); 
    
        return result;
    
    } catch (error) {
        throw error; 
        }
    };

const deleteMedico = async (id) => {
    try {
        const result = await client.query(`
        DELETE FROM medico WHERE id_medico = $1`, [id]);

        if (result.rowCount === 0) {
            throw new Error(`Médico con ID ${id} no encontrado`);
        }

        return result;
    } catch (error) {
        console.error(`Error al eliminar el médico con ID ${id}:`, error);

        throw new Error('Error al eliminar el médico desde la base de datos');
    }
};

const updateMedico = async (id, nombre, apellido, mail, telefono, pfp) => {
    try {
        const result = await client.query(`
        UPDATE medico SET nombre = $1, apellido = $2, mail = $3, telefono = $4, pfp = $5 WHERE id_medico = $6`, 
        [nombre, apellido, mail, telefono, pfp, id]);

        if (result.rowCount === 0) {
            throw new Error(`Médico con ID ${id} no encontrado o no se pudo actualizar`);
        }

        return { message: 'Médico actualizado con éxito' };
    } catch (error) {
        console.error(`Error al actualizar el médico con ID ${id}:`, error);

        throw new Error('Error al actualizar el médico en la base de datos');
    }
};

export default {
    getMedicos,
    getMedicoById,
    getMedicoByMail,
    createMedico,
    deleteMedico,
    updateMedico
};