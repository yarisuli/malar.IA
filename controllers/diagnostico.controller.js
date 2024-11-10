import diagnosticoService from "../services/diagnostico.service.js";
import cloudinary from "../upload.js";
import fs from "fs";

const getMedicoDiagnosticos = async (req, res) => {
    const idMedico = req.id; //EL ID MEDICO LO TIENE QUE AGARRAR DEL ID DEL MEDICO QUE INICIO SESION
    console.log(idMedico);

    try {

        const result = await diagnosticoService.getMedicoDiagnosticos(idMedico);

        if (result.rows.length === 0) {
            return res.status(204).json({ error: "Diagnósticos del medico no encontrados."});
        }

        res.json(result.rows);

    } catch (error) {
        console.error("Error al obtener diagnósticos del médico:", error);
        res.status(500).json({ message: "Error al obtener los diagnósticos del médico." });
    }
};

const getDiagnostico = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ error: "Se necesita el ID del diagnóstico." });
        }

        const result = await diagnosticoService.getDiagnostico(id);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Diagnóstico no encontrado" });
        }

        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener el diagnóstico:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const createDiagnostico = async (req, res) => {
    const idMedico = req.id;
    const idPaciente = req.params.idPaciente;
    const { analisisIA, notas } = req.body;

    if (!analisisIA || !notas || !idPaciente)
        return res.status(400).json({ message: "Faltan campos por llenar." });

    try {
        await diagnosticoService.createDiagnostico(analisisIA, notas, idPaciente, idMedico);
        res.status(201).json({ message: "Se creó el diagnóstico correctamente." });

    } catch (error) {
        console.error('Error al crear diagnóstico:', error);
        res.status(500).json({ error: "Error al crear el diagnóstico." });
    }
};

const deleteDiagnostico = async (req, res) => {
    const id = req.params.id;

    diagnosticoService.deleteDiagnostico(id);

    res.send("Se eliminó el diagnóstico correctamente.");
};

const updatePacienteDiagnostico = async (req, res) => {
    const id = req.params.id;
    const idPaciente = req.body.idPaciente;

    diagnosticoService.updatePacienteDiagnostico(id, idPaciente);

    res.send("Se asigno el paciente al diagnostico correctamente.");
};

const updateDiagnostico = async (req, res) => {


    // try {
    //     await diagnosticoService.updateDiagnostico(analisisIA, notas, idPaciente, idMedico);
    //     res.status(201).json({ message: "Se creó el diagnóstico correctamente." });

    // } catch (error) {
    //     console.error('Error al crear diagnóstico:', error);
    //     res.status(500).json({ error: "Error al crear el diagnóstico." });
    // }
};

const diagnostico =
{
    getMedicoDiagnosticos,
    getDiagnostico,
    createDiagnostico,
    deleteDiagnostico,
    updatePacienteDiagnostico
};

export default diagnostico;