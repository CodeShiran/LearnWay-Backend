import express from 'express'
import './config/db.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()




app.use(errorHandler)

app.listen(3000, () => {
    console.log("server is running on port 3000")
})

app.get('/', (req, res) => {
    res.send('hello shiran')
})