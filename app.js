import express from 'express'
import './config/db.js'
import { errorHandler } from './middleware/errorHandler.js'
import { arcjetProtect } from './middleware/arcjet.js'
import { authRouter } from './routes/login.routes.js'

const app = express()


app.use(arcjetProtect)
app.use('/auth', authRouter)
app.get('/user', (req, res) => {
    res.send('hello shiran')
})


app.use(errorHandler)

app.listen(3000, () => {
    console.log("server is running on port 3000")
})

