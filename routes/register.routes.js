import express from 'express'
import { registerUser } from '../controller/auth.controller.js'

const registerRoute = express.Router()

registerRoute.post('/login', registerUser)