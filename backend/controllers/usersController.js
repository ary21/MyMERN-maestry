import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModel from '../models/user.js'; 

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isCorrectPassword = await bcrypt.compare(password, existingUser.password);

        if (!isCorrectPassword) {
            return res.status(400).json({ message: 'Invalid Password' });
        }
        
        const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, 'test-secret-key', { expiresIn: '1h' });

        res.status(200).json({ ...existingUser, token });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPasword } = req.body;
    
    try {
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if (password !== confirmPasword) {
            return res.status(400).json({ message: 'Confirm password does not match' });
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new UserModel({ firstName, lastName, email, password: hashPassword });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id, email: newUser.email }, 'test-secret-key', { expiresIn: '1h' });

        res.status(200).json({ ...newUser, token });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};