import diagnosticoService from "../services/diagnostico.service.js";
import pacienteService from "../services/paciente.service.js";
import cloudinary from "../upload.js";
import fs from "fs";

const postImagen = async (req, res) => {
    const idMedico = req.id;
    const foto = req.file.path;
    const fechaAnalisis = new Date().toISOString();

    if (!idMedico || !foto) {
        return res.status(400).json({ message: "Se necesita un médico y una imagen." });
    }

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
        const body = { url: imageUrl };

        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error en la predicción:', errorData);
            return res.status(422).json({ error: "Error en la predicción.", details: errorData });
        }

        const data = await response.json();
        
        if(!data.resultado) {
            console.error('Error en la predicción:', data);
            return res.status(422).json({ error: "Error en la predicción.", details: data});
        };

        const result2 = await diagnosticoService.postImagen(idMedico, imageUrl, fechaAnalisis, data);
        
        if (!result2) {
            console.log("No se guardó en la base de datos");
            return res.status(500).json({ error: "Error al guardar en la base de datos." });
        } else {
            console.log("Se guardó en la base de datos correctamente");
        }

        const result3 = await diagnosticoService.getIdDiagnostico(imageUrl);

        if (result3 && result3.rows && result3.rows.length > 0) {
        const idDiag = result3.rows[0].id_diag ;
            console.log(idDiag);
            res.json({ 
                "id_diag":idDiag,
                "url": imageUrl
                });

        } else {
            console.error("No se encontró el ID del diagnóstico");
            res.status(404).json({ error: "No se encontró el ID del diagnóstico." });
        }

        fs.unlinkSync(foto);

    } catch (error) {
        console.error('Error al subir imagen o realizar predicción:', error);
        res.status(500).json({ error: "Error al subir imagen o realizar predicción." });
    }
};

const imagen = {
    postImagen,
};

export default imagen;