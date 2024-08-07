import express from "express";
const app = express();
const port = 3000;

import medicos from "./controllers/medicos.js";
import pacientes from "./controllers/pacientes.js";
import diagnostico from "./controllers/diagnostico.js";

app.use(express.json());

app.get("/", (_, res) => {
    res.send("malar.IA API working!");
});

//RUTAS

// app.ACCION("COSO DEL REST", NOM.controllers.NOM.const);

app.listen(port, () => {
    console.log(`malar.IA is listening at http://localhost:${port}`);
});