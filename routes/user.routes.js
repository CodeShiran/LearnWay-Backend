import { registerUser, userLogin } from '../controller/auth.controller.js'
import express from 'express'
export const userRoute = express.Router()


userRoute.post('/login', userLogin)
userRoute.post('/register', registerUser)