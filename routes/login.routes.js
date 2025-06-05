import express from 'express'

import { addUser } from '../controller/auth.controller.js'

export const authRouter = express.Router()


authRouter.post('/register', addUser)