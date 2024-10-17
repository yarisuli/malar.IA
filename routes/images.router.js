import images from "../controllers/images.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const files = fileURLToPath(import.meta.url);
const uploads = dirname(files);

// Poner la ubicacion de la carpeta de Uploads correspondiente, en este caso se ubica dentro del SRC
const uploadDir = join(uploads, "../uploads");

// Se define donde se va a ubicar el archivo que vamos a subir y el nombre, este se puede modificar, en este caso el nombre que se le va a asignar es la fecha de subida sumado del nombre del archivo original
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

// El siguiente filtro es para que se suban unicamente archivos con extensiones especificas. En este caso serian JPEG, PNG y JPG
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, PNG, JPEG, and JPG files are allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const router = Router();

router.post("/subirImagen/:idPaciente", upload.single('file'), images.postImagen);
router.post("/predict", images.sendURL);

export default router;