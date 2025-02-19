import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {JWT_SECRET, JWT_EXPIRE_IN} from '../config/env.js';

export const signUp = async (req, res, next) => {
    const {name, email, password} = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: name, email, and password are required'
            });
        }

        //Check if the user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            throw new Error('User already exists');
        }

        //Hash the password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUsers = new User({name, email, password: hashedPassword});
        await newUsers.save({session: session});
        //Create jwt token
        const token = jwt.sign({userId: newUsers.id}, JWT_SECRET, {expiresIn: JWT_EXPIRE_IN});
        await session.commitTransaction();
        await session.endSession();
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {token},
            user: newUsers[0]
        });

    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }
};

export const signIn = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: email and password are required'
            });
        }

        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        //Create jwt token
        const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: JWT_EXPIRE_IN});
        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {token},
            user: user
        });
    } catch (error) {
        next(error);
    }
};

export const signOut = async (req, res, next) => {
    try {
        await res.send('SignOut user');
    } catch (error) {
        next(error);
    }
};