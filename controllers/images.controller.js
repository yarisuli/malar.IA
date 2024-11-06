import diagnosticoService from "../services/diagnostico.service.js";
import cloudinary from "../upload.js";
import fs from "fs";

const postImagen = async (req, res) => {
    const idMedico = req.id;
    const foto = req.file.path;

    if (!idMedico || !foto) 
        return res.status(400).json({ message: "Se necesita un medico y una imagen." });

    const extension = foto.split('.').pop().toLowerCase();
    const extensionesPermitidas = ['pdf', 'png', 'jpeg', 'jpg'];

    if (!extensionesPermitidas.includes(extension)) {
        console.error("Extensión de archivo no permitida");
        return res.status(400).json({ error: "Extensión de archivo no permitida. Extensiones admitidas: PDF, PNG, JPEG, y JPG" });
    }

    try {

        const result = await cloudinary.uploader.upload(foto, {
            folder: 'uploads',
        });
        
        const imageUrl = result.secure_url;

        await diagnosticoService.postImagen(idMedico, imageUrl);
        fs.unlinkSync(foto);

        res.status(200).json({ message: "Se subió la imagen correctamente." });

    } catch (error) {
        console.error('Error al subir imagen:', error);
        res.status(500).json({ error: "Error al subir imagen." });
    }
}

const imagen = {
    postImagen,
};

export default imagen;