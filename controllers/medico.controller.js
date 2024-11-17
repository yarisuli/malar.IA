import { client } from "../db.js";
import medicoService from "../services/medico.service.js";

// NO SIRVE PARA WEB, SIRVE PARA MI
const getMedicos = async (req, res) => {
    try {
        const result = await medicoService.getMedicos();
        res.json(result.rows);

    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Error al obtener los médicos.' });
    }
};

const getMedicoById = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: 'El ID del médico es requerido.' });
    }

    try {
        const result = await medicoService.getMedicoById(id);

        if (!result || !result.rows || result.rows.length === 0) {
            return res.status(404).json({ message: 'Médico no encontrado' });
        }

        res.json(result.rows[0]); 
    } catch (error) {

        console.error('Error al obtener el médico:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getMedicoByMail = async (req, res) => {
    const mail = req.body.mail;

    if (!mail) {
        return res.status(400).json({ message: 'El correo del médico es requerido.' });
    }

    try {
        const result = await medicoService.getMedicoByMail(mail);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Médico no encontrado.' });
        }
        res.json(result.rows);

    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Error al obtener el médico.' });
    }
};

const createMedico = async (req, res) => {
    const { mail, telefono, contra, nombre, apellido, pfp } = req.body;

    if (!mail || !telefono || !contra || !nombre || !apellido) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    try {
        const result = await medicoService.createMedico(mail, telefono, contra, nombre, apellido, pfp);
        
        if (result.rowCount === 0) {
            return res.status(500).json({ message: 'Error al crear el médico.' });
        }

        res.send("Se creó el usuario correctamente.");
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Error al crear el médico.' });
    }
};

const deleteMedico = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: 'El ID del médico es requerido.' });
    }

    try {
        const result = await medicoService.deleteMedico(id);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Médico no encontrado.' });
        }

        res.send("Se eliminó el usuario correctamente.");
    } catch (error) {

        console.error(error); 
        res.status(500).json({ message: 'Error al eliminar el médico.' });
    }
};

const updateMedico = async (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, mail, telefono, pfp } = req.body;

    if (!id || !nombre || !apellido || !mail || !telefono || !pfp) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    try {
        const result = await medicoService.updateMedico(id, nombre, apellido, mail, telefono, pfp);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Médico no encontrado.' });
        }

        res.send("Se actualizó el usuario correctamente.");
    } catch (error) {

        console.error(error); 
        res.status(500).json({ message: 'Error al actualizar el médico.' });
    }
};

const medico = {
    getMedicos,
    getMedicoById,
    getMedicoByMail,
    createMedico,
    deleteMedico,
    updateMedico
};

export default medico;
