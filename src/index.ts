import express, { Request, Response } from 'express'
import cors from 'cors'
import { courses, students } from './database'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

app.get ("/courses", (req: Request, res: Response) => {
    res.status(200).send(courses)
    // res.send("cursos")
})

//get com query
app.get("/courses/search", (req: Request, res: Response) => {
    const q = req.query.q as string
    const coursesFilter = courses.filter((course) =>
        course.name.toLowerCase().includes(q.toLowerCase())
    )
    res.status(200).send(coursesFilter)
})

// http://localhost:3003/courses/search?q=react

//criar curso 
app.post("/courses", (req: Request, resp: Response) => {
    const id = req.body.id
    const name = req.body.name
    const lessons = req.body.lessons
    const stack = req.body.stack

    const newCourse = {
        id,
        name,
        lessons,
        stack
    }
    courses.push(newCourse)
    resp.status(201).send("Curso criado com sucesso")
})

//fixacao
//pegar todos os estudantes
app.get ("/students", (req: Request, res: Response) => {
    res.status(200).send(students)
    // res.send("cursos")
})