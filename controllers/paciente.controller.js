import { client } from "../db.js";
import pacienteService from "../services/paciente.service.js";

const getPacientes = async (req, res) => 
{
    const idMedico = 1; //EL ID MEDICO LO TIENE QUE AGARRAR DEL ID DEL MEDICO QUE INICIO SESION

    const result = await pacienteService.getPacientes(idMedico);

    res.json(result.rows); 
};

const getPaciente = async (req, res) => 
{
    const id = req.params.id;

    const result = await pacienteService.getPaciente(id);

    res.json(result.rows); 
};

const createPaciente = async (req, res) => {

    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const nacimiento = req.body.nacimiento;
    const sexo = req.body.sexo;
    const dni = req.body.dni;
    const pais = req.body.pais;
    const ocupacion = req.body.ocupacion;
    const numero = req.body.numero;
    const mail = req.body.mail;
    const instruccion = req.body.instruccion;
    const pfp = req.body.pfp;
    const idMedico = req.id; //EL ID MEDICO LO TIENE QUE AGARRAR DEL ID DEL MEDICO QUE INICIO SESION

    pacienteService.createPaciente(nombre, apellido, nacimiento, sexo, dni, pais, ocupacion, numero, mail, instruccion, pfp, idMedico);

    res.send("Se creó el paciente correctamente.");
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