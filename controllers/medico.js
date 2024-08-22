//import { client } from "../db.js";

//NO SIRVE PARA WEB, SIRVE PARA MI
const getMedicos = async (req, res) => 
{
    getMedicos_service();

    res.json(result.rows); 
};

const getMedico = async (req, res) => 
{
    const id = req.params.id;

    getMedico_service(id);

    res.json(result.rows); 
};

const createMedico = async (req, res) => 
{
    const mail = req.body.mail;
    const telefono = req.body.telefono;
    const contra = req.body.contra;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const pfp = req.body.pfp;

    createMedico_service(mail, telefono, contra, nombre, apellido, pfp); 

    res.send("Se creó el usuario correctamente.");
};

const deleteMedico = async (req, res) => 
{
    const id = req.params.id;

    deleteMedico_service(id);

    res.send("Se eliminó el usuario correctamente.");
};

const updateMedico = async (req, res) => 
{
    const id = req.params.id;
    const mail = req.body.mail;

    updateMedico_service(id, mail);

    res.send("Se actualizó el usuario correctamente.");
};
const medico =
{
    getMedicos,
    getMedico,
    createMedico, 
    deleteMedico,
    updateMedico
};

export default medico;