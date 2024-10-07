import diagnosticoService from "../services/diagnostico.service.js";
import cloudinary from "../upload.js";
import fs from "fs";

const getMedicoDiagnosticos = async (req, res) => {
    
    const idMedico = req.id; //EL ID MEDICO LO TIENE QUE AGARRAR DEL ID DEL MEDICO QUE INICIO SESION

    const result = await diagnosticoService.getMedicoDiagnosticos(idMedico);

    res.json(result.rows);
};

const getDiagnostico = async (req, res) => {

    const id = req.params.id;

    const result = await diagnosticoService.getDiagnostico(id);

    res.json(result.rows);
};

const createDiagnostico = async (req, res) => {
    const idPaciente = req.params.idPaciente;
    const { analisisIA, notas } = req.body;

    if (!analisisIA || !notas)
        return res.status(400).json({ message: "Faltan campos por llenar." });

    try {
        await diagnosticoService.createDiagnostico(analisisIA, notas, idPaciente);
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

const updateDiagnostico = async (req, res) => {
    const id = req.params.id;
    const idPaciente = req.body.idPaciente;

    diagnosticoService.updateDiagnostico(id, idPaciente);

    res.send("Se actualizó el diagnóstico correctamente.");
};

const diagnostico =
{
    getMedicoDiagnosticos,
    getDiagnostico,
    createDiagnostico,
    deleteDiagnostico,
    updateDiagnostico
};

export default diagnostico;