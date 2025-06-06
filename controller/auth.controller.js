import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'


export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: 'Email and password are required' });

        const user = await User.findOne({ email }); // use MongoDB query, not .find()

        if (!user)
            return res.status(401).json({ message: 'Invalid email' });

        const isMatch = await user.matchPassword(password)

        console.log(password)
        console.log(isMatch)
        if (!isMatch)
            return res.status(401).json({ message: 'Invalid password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        const { password: _, ...userWithoutPassword } = user.toObject();

        res.status(200).json({ user: userWithoutPassword, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' }); // FIXED: . instead of ,
    }
};

export const registerUser = async (req, res) => {
    try {
        const {email, password, name, role} = req.body
        
        if(!email || !password || !name || !role) return res.status(400).json({message: 'name, email, password and role are required'})

        const existingUser = await User.findOne({email})

        if(existingUser) return res.status(409).json({messaage: 'user already exists'})

        const user = new User({name, email, password, role})
        await user.save()

        const {password:_,...userData} = user.toObject()

        res.status(201).json({message: userData})

    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
}