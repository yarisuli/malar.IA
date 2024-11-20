import diagnosticoService from "../services/diagnostico.service.js";
import pacienteService from "../services/paciente.service.js";

const getMedicoDiagnosticos = async (req, res) => {
    const idMedico = req.id; 

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
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ error: "Se necesita el ID del diagnóstico." });
    }

    try {
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

    if (!analisisIA || !notas) {
        return res.status(400).json({ message: "Faltan campos por llenar." });
    }

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

    if (!id) {
        return res.status(400).json({ message: "El ID del diagnóstico es requerido." });
    }

    try {
        await diagnosticoService.deleteDiagnostico(id);
        res.send("Se eliminó el diagnóstico correctamente.");
    } catch (error) {
        console.error("Error al eliminar el diagnóstico:", error);
        res.status(500).json({ message: "Error al eliminar el diagnóstico." });
    }
};

const updatePacienteDiagnostico = async (req, res) => {
    const idDiag = req.params.id;
    const idPaciente = req.body.idPaciente;

    if (!idDiag || !idPaciente) {
        return res.status(400).json({ message: "El ID del diagnóstico y el ID del paciente son requeridos." });
    }

    try {
        await diagnosticoService.updatePacienteDiagnostico(idDiag, idPaciente);
        console.log("Se asignó el paciente al diagnóstico correctamente.");

        const result = await diagnosticoService.getResultadoDiagnostico(idDiag);
        const estadoPaciente = result.rows[0].analisis_ia;

        await pacienteService.updateEstadoPaciente(idPaciente, estadoPaciente);
        console.log("Se actualizó el estado del paciente correctamente.");
        res.send("Se asignó el paciente al diagnóstico y actualizó su estado correctamente.");

    } catch (error) {
        console.error("Error al asignar paciente o actualizando su estado: ", error);
        res.status(500).json({ message: "Error al asignar paciente al diagnóstico o actualizando su estado." });
    }
};

const updateNotasDiagnostico = async (req, res) => {
    const id = req.params.id;
    const notas = req.body.notas;

    if (!id) {
        return res.status(400).json({ message: "El ID del diagnóstico es requerido." });
    }

    try {
        await diagnosticoService.updateNotasDiagnostico(id, notas);
        res.send("Se actualizaron las notas del diagnóstico correctamente.");

    } catch (error) {
        console.error("Error al actualizar las notas del diagnóstico:", error);
        res.status(500).json({ message: "Error al actualizar las notas del diagnóstico." });
    }
};

const diagnostico = {
    getMedicoDiagnosticos,
    getDiagnostico,
    createDiagnostico,
    deleteDiagnostico,
    updatePacienteDiagnostico,
    updateNotasDiagnostico
};

export default diagnostico;
