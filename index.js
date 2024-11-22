import express from "express";
import cors from "cors";
const app = express();
const port = 3000;

app.use(cors());

import diagnosticoRouter from "./routes/diagnostico.router.js"
import medicoRouter from "./routes/medico.router.js"
import pacienteRouter from "./routes/paciente.router.js"
import authRouter from "./routes/auth.router.js"
import imagesRouter from "./routes/images.router.js"


app.use(express.json());

app.get("/", (_, res) => {
    res.send("malar.IA API working!");
});

//ROUTER DIAGNOSTICO
app.use("/diagnostico", diagnosticoRouter);

//ROUTER MEDICO
app.use("/medico", medicoRouter);

//ROUTER PACIENTE
app.use("/paciente", pacienteRouter);

//ROUTER AUTH
app.use("/auth", authRouter); 

//ROUTER IMAGES
app.use("/images", imagesRouter);


app.listen(port, () => {
    console.log(`malar.IA is listening at http://localhost:${port}`);
});
