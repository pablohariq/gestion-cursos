//En postgres:
// CREATE DATABASE cursos ;
// CREATE​ ​TABLE​ cursos (​id​ ​SERIAL​ PRIMARY ​KEY​, nombre ​VARCHAR​(​50​), nivel
// INT​, fecha ​DATE​, duracion ​INT​);

const {Pool} = require('pg')


const config = {
    user: "postgres",
    password: "postgres",
    server: "localhost",
    port: 5432,
    database: "cursos"
}
const pool = new Pool(config)

const ingresarCurso = async (curso) => {
    const valoresCurso = Object.values(curso)
    const client = await pool.connect()
    const {rows: respuesta} = await client.query(`INSERT INTO cursos(nombre, nivel, fecha, duracion) VALUES($1, $2, $3, $4) RETURNING *;`, valoresCurso)
    return respuesta
}

const consultarCursos = async () => {
    const client = await pool.connect()
    const {rows: respuesta} = await client.query(`SELECT * FROM cursos;`)
    return respuesta
}

const borrarCurso = async (id) => {
    const client = await pool.connect()
    const borracion = await client.query(`DELETE FROM cursos WHERE id='${id}' RETURNING *;`)
    return borracion
}

const editarCurso = async (id, curso) => {
    curso.id = id
    const valoresCurso = Object.values(curso)
    const client = await pool.connect()
    const edicion = client.query(`
    UPDATE cursos SET
     nombre = $1,
     nivel = $2,
     fecha = $3,
     duracion = $4
     WHERE id = $5 RETURNING *;`, valoresCurso)
    return edicion
}

module.exports = {ingresarCurso, consultarCursos, borrarCurso, editarCurso}
