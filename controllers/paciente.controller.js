import { client } from "../db.js";
import diagnosticoService from "../services/diagnostico.service.js";
import pacienteService from "../services/paciente.service.js";

const getPacientes = async (req, res) => {
    const idMedico = req.id;

    if (!idMedico) {
        return res.status(400).json({ message: "ID de médico no encontrado." });
    }

    try {
        const result = await pacienteService.getPacientes(idMedico);

        if (!result || result.rows.length === 0) {
            return res.status(204).json({ message: "No se encontraron pacientes para este médico." });
        }

        res.status(200).json(result.rows);

    } catch (error) {
        console.error("Error al obtener los pacientes:", error);
        res.status(500).json({ message: "Error al obtener los pacientes" });
    }
};

const getPaciente = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID de paciente no proporcionado." });
    }

    try {
        const result = await pacienteService.getPaciente(id);

        if (!result || result.rows.length === 0) {
            return res.status(204).json({ message: "Paciente no encontrado." });
        }

        const resultDiags = await diagnosticoService.getDiagnosticosPaciente(id);

        const paciente =result.rows;
        
         const pacientediag =    
            paciente.map(item => ({
                ...item,
                diagnosticos: resultDiags.rows,
              })); 
        
              console.log("pacientediag", pacientediag);
        

        res.status(200).json(pacientediag);

    } catch (error) {
        console.error("Error al obtener el paciente:", error);
        res.status(500).json({ message: "Error al obtener el paciente" });
    }
};

const createPaciente = async (req, res) => {
    const { nombre, apellido, nacimiento, sexo, dni, pais, ocupacion, numero, mail, instruccion, pfp } = req.body;
    const idMedico = req.id; 

    // if (!nombre || !apellido || !nacimiento || !sexo || !dni || !pais || !ocupacion || !numero || !mail || !instruccion || !idMedico) {
    //     return res.status(400).json({ message: "Faltan campos por llenar." });
    // }

    try {
        await pacienteService.createPaciente(nombre, apellido, nacimiento, sexo, dni, pais, ocupacion, numero, mail, instruccion, pfp, idMedico);

        res.status(201).json({ message: "Paciente creado correctamente." });

    } catch (error) {
        console.error("Error al crear el paciente:", error);
        res.status(500).json({ message: "Error al crear el paciente." });
    }
};

const deletePaciente = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID de paciente no proporcionado." });
    }

    try {
        await pacienteService.deletePaciente(id);

        res.status(200).json({ message: "Se eliminó el paciente correctamente." });

    } catch (error) {
        console.error("Error al eliminar el paciente:", error);
        res.status(500).json({ message: "Error al eliminar el paciente." });
    }
};

const updatePaciente = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, nacimiento, sexo, dni, pais, ocupacion, numero, mail, instruccion, pfp } = req.body;

    if (!nombre || !apellido || !nacimiento || !sexo || !dni || !pais || !ocupacion || !numero || !mail || !instruccion) {
        return res.status(400).json({ message: "Falta llenar algún campo." });
    }

    try {
        await pacienteService.updatePaciente(id, nombre, apellido, nacimiento, sexo, dni, pais, ocupacion, numero, mail, instruccion, pfp );

        res.status(200).json({ message: "Se actualizó el paciente correctamente." });

    } catch (error) {
        console.error("Error al actualizar el paciente:", error);
        res.status(500).json({ message: "Error al actualizar el paciente." });
    }
};

const dischargePaciente = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "No se indico el paciente." });
    }

    try {
        await pacienteService.updateEstadoPaciente(id, "-");

        res.status(200).json({ message: "Se actualizó el paciente correctamente." });

    } catch (error) {
        console.error("Error al actualizar el paciente:", error);
        res.status(500).json({ message: "Error al actualizar el paciente." });
    }
};
const paciente = {
    getPacientes,
    getPaciente,
    createPaciente,
    deletePaciente,
    updatePaciente,
    dischargePaciente
};

export default paciente;
