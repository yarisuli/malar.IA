import { client } from "../db.js";
import pacienteService from "../services/paciente.service.js";

const getPacientes = async (req, res) => {
    const idMedico = req.id; // ID DE MEDICO QUE ESTA EN EL TOKEN

    if (!idMedico) {
        return res.status(400).json({ message: "ID de médico no econtrado." });
    }

    try {
        const result = await pacienteService.getPacientes(idMedico);

        if (!result || result.rows.length === 0) {
            return res.status(404).json({ message: "No se encontraron pacientes para este médico." });
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
            return res.status(404).json({ message: "Paciente no encontrado." });
        }

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error al obtener el paciente:", error);
        res.status(500).json({ message: "Error al obtener el paciente" });
    }
};

const createPaciente = async (req, res) => {
    const { nombre, apellido, nacimiento, sexo, dni, pais, ocupacion, numero, mail, instruccion, pfp } = req.body;
    const idMedico = req.id; // ID DE MEDICO QUE ESTA EN EL TOKEN

    if (!nombre || !apellido || !nacimiento || !sexo || !dni || !pais || !ocupacion || !numero || !mail || !instruccion || !idMedico) {
        return res.status(400).json({ message: "Faltan campos por llenar." });
    }

    try {
        await pacienteService.createPaciente(nombre, apellido, nacimiento, sexo, dni, pais, ocupacion, numero, mail, instruccion, pfp, idMedico);

        res.status(201).json({ message: "Paciente creado correctamente." });

    } catch (error) {
        console.error("Error al crear el paciente:", error);
        res.status(500).json({ message: "Error al crear el paciente." });
    }
};


const deletePaciente = async (req, res) => 
{
    const id = req.params.id;

    pacienteService.deletePaciente(id); 

    res.send("Se eliminó el paciente correctamente.");
};

const updatePaciente = async (req, res) => 
{
    const id = req.params.id;
    const nacimiento = req.body.nacimiento;

    pacienteService.updatePaciente(id, nacimiento);

    res.send("Se actualizó el paciente correctamente.");
};

const paciente = 
{
    getPacientes,
    getPaciente,
    createPaciente,
    deletePaciente,
    updatePaciente
};

export default paciente;