import express from "express";
const app = express();
const port = 3000;

import diagnosticoRouter from "./routes/diagnostico.router.js"
import medicoRouter from "./routes/medico.router.js"
import pacienteRouter from "./routes/paciente.router.js"

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


app.listen(port, () => {
    console.log(`malar.IA is listening at http://localhost:${port}`);
});
