import express from "express";
const app = express();
const port = 3000;

import medicos from "./controllers/medicos.js";
import pacientes from "./controllers/pacientes.js";
import diagnostico from "./controllers/diagnostico.js";
import medico from "./controllers/medico.js";
import paciente from "./controllers/paciente.js";

app.use(express.json());

app.get("/", (_, res) => {
    res.send("malar.IA API working!");
});

//RUTAS DIAGNOSTICO

app.get("/diagnostico", diagnostico.getDiagnosticos);
app.get("/diagnostico/:id", diagnostico.getDiagnostico);
app.post("/diagnostico", diagnostico.createDiagnostico);
app.put("/diagnostico/:id", diagnostico.updateDiagnostico);
app.delete("/diagnostico/:id", diagnostico.deleteDiagnostico);

//RUTAS MEDICO
app.get("/medico", medico.getMedico);
app.get("/medico/:id", medico.getMedico);
app.post("/medico", medico.createMedico);
app.put("/medico/:id", medico.updateMedico);
app.delete("/medico/:id", medico.deleteMedico);

//RUTAS PACIENTE
app.get("/paciente", paciente.getPacientes);
app.get("/paciente/:id", paciente.getPaciente);
app.post("/paciente", paciente.createPaciente);
app.put("/paciente/:id", paciente.updatePaciente);
app.delete("/paciente/:id", paciente.deletePaciente);


app.listen(port, () => {
    console.log(`malar.IA is listening at http://localhost:${port}`);
});
