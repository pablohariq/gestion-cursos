const express = require('express')
const {ingresarCurso, consultarCursos, borrarCurso, editarCurso} = require('./consultas')

const app = express()
//middlewares
app.use(express.json())


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/curso", async (req, res) => {
    const body = req.body
    try {
        const insercion = await ingresarCurso(body)
        res.send(insercion)
    } catch (error) {
        res.status(500)
        res.send(error)
    }
})

app.get("/cursos", async (req, res) => {
    try {
        const cursos = await consultarCursos()
        res.send(cursos)
    } catch (error) {
        res.status(500)
        res.send(error)
    }
})

app.delete("/curso/:id", async (req, res) => {
    const {id} = req.params
    try {
        const borracion = await borrarCurso(id)
        res.send(borracion)
    } catch (error) {
        res.status(500)
        console.error(error)
        res.send(error)
    }
})

app.put("/curso/:id", async (req, res) => {
    const {id} = req.params
    const curso = req.body
    console.log(curso)
    try {
        const edicion = await editarCurso(id, curso)
        res.send(edicion)
    } catch (error) {
        res.status(500)
        console.error(error)
        res.send(error)
    }
})

app.listen(3000)