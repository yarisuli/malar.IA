import { client } from "../db.js";
import diagnosticoService from "../services/diagnostico.service.js";

const getDiagnosticos = async (req, res) => {
    const idMedico = req.params.idMedico; //EL ID MEDICO LO TIENE QUE AGARRAR DEL ID DEL MEDICO QUE INICIO SESION

    const result = await diagnosticoService.getDiagnosticos(idMedico);

    res.json(result.rows);
};

const getDiagnostico = async (req, res) => {
    const id = req.params.id;

    const result = await diagnosticoService.getDiagnostico(id)

    res.json(result.rows);
};

//EJEMPLO CON SERVICE
const createDiagnostico = async (req, res) => {
    const foto = req.body.foto;
    const analisisIA = req.body.analisisIA;
    const notas = req.body.notas;

    diagnosticoService.createDiagnostico(foto, analisisIA, notas);

    res.send("Se creó el diagnóstico correctamente.");
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
    getDiagnosticos,
    getDiagnostico,
    createDiagnostico,
    deleteDiagnostico,
    updateDiagnostico
};

export default diagnostico;