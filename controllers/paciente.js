import { client } from "../db.js";

const getPacientes = async (req, res) => 
{
    const idMedico = req.params.idMedico; //EL ID MEDICO LO TIENE QUE AGARRAR DEL ID DEL MEDICO QUE INICIO SESION

    getPacientes_service(idMedico);

    res.json(result.rows); 
};

const getPaciente = async (req, res) => 
{
    const id = req.params.id;

    getPaciente_service(id);

    res.json(result.rows); 
};

const createPaciente = async (req, res) => {

    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const nacimiento = req.body.nacimiento;
    const pais = req.body.pais;
    const genero = req.body.genero;
    const estado = req.body.estado;
    const mail = req.body.mail;
    const pfp = req.body.pfp;
    const idMedico = req.params.idMedico; //EL ID MEDICO LO TIENE QUE AGARRAR DEL ID DEL MEDICO QUE INICIO SESION

    createPaciente_service(nombre, apellido, nacimiento, estado, pais, genero, mail, pfp, idMedico);

    res.send("Se creó el paciente correctamente.");
};

const deletePaciente = async (req, res) => 
{
    const id = req.params.id;

    deletePaciente_service(id); 

    res.send("Se eliminó el paciente correctamente.");
};

const updatePaciente = async (req, res) => 
{
    const id = req.params.id;
    const nacimiento = req.body.nacimiento;

    updatePaciente_service(id, nacimiento)
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