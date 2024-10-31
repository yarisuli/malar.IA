import MedicoService from "../services/medico.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    const { nombre, apellido, mail, telefono, contra, pfp } = req.body;  // Extraemos pfp si existe (puede ser null)
    const saltRounds = 10;

    if (!mail || !telefono || !contra || !nombre || !apellido)
        return res.status(400).json({ message: "Faltan campos por llenar." });

    try {
        const medicoExistente = await MedicoService.getMedicoByMail(mail);

        if (medicoExistente)
            return res.status(400).json({ message: "Ya existe un medico con este mail." });

        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(contra, salt);

        await MedicoService.createMedico(mail, telefono, hash, nombre, apellido, pfp);

        res.status(201).json({ message: "Medico creado con éxito." });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const login = async (req, res) => {
    const mail = req.body.mail;
    const contra = req.body.contra;

    if (!mail || !contra) 
        return res.status(400).json({ message: "Se necesita un mail y una contraseña." });

    try {  
        const medicoExistente = await MedicoService.getMedicoByMail(mail);
        
        // Log para verificar lo que se está obteniendo
        console.log("Medico Existente:", medicoExistente);

        if (!medicoExistente)
            return res.status(404).json({ message: "Medico con mail no encontrado." });

        const match = await bcrypt.compare(contra, medicoExistente.contra);

        if (!match)
            return res.status(400).json({ message: "Contraseña incorrecta." });

        // Generar el token con el ID del médico
        const token = await jwt.sign({ id: medicoExistente.id_medico }, "secret", { expiresIn: "30m" });
        
        // Log para ver el token y el id
        console.log(token); 
        console.log(medicoExistente.id_medico);
        
        // Devolver usuario con el id y el teléfono
        return res.status(200).json({
            usuario: {
                id: medicoExistente.id_medico, // Cambia aquí para usar id_medico
                mail: medicoExistente.mail,
                nombre: medicoExistente.nombre,
                apellido: medicoExistente.apellido,
                telefono: medicoExistente.telefono, // Cambia aquí para usar telefono
                token: token
            }, 
            // token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export default { register, login };
