const getPacientes_service = async (idMedico) => {

    const result = await client.query(`
    SELECT * FROM paciente WHERE id_medico = $1`, [idMedico]);

}

const getPaciente_service = async (id) => {

    const result = await client.query(`
    SELECT * FROM paciente WHERE id_paciente = $1`, [id]);

}

const createPaciente_service = async (nombre, apellido, nacimiento, estado, pais, genero, mail, pfp, idMedico) => {

    const result = await client.query(`
    INSERT INTO paciente (nombre, apellido, nacimiento, pais, genero, estado, mail, pfp, id_medico)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [nombre, apellido, nacimiento, estado, pais, genero, mail, pfp, idMedico]); 
}

const deletePaciente_service = async (id) => {

    const result = await client.query(`
    DELETE FROM paciente WHERE id_paciente = $1`, [id]); 

}

const updatePaciente_service = async (id, nacimiento) => {

    const result = await client.query(`
    UPDATE paciente SET nacimiento = $1 WHERE id_paciente = $2`, [nacimiento, id]);

}