import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userSchema } from '../models/user.model.js'

export const addUser = async (req, res) => {
    const {email , password } = req.body

    if(!email || !password) return res.status(400).json({message: 'email and password are required'})

    const user = userSchema.find(u => u.email === email)

    if(!user) return res.status(401).json({message: 'invalid email'})

    const isMatch = await bcrypt.compare(password, user.password)
    
    if(!isMatch) return res.status(401).json({message: 'invalid password'})

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET,{ expiresIn: '1h' })

    const { password:_, ...userWithoutPassword} = user
    res.status(200).json({user: userWithoutPassword, token})

        
}