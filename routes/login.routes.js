import { userLogin } from '../controller/auth.controller.js'
import express from 'express'
export const loginRouter = express.Router()


loginRouter.post('/login', userLogin)