import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {JWT_SECRET, JWT_EXPIRE_IN} from '../config/env.js';

export const signUp = async (req, res, next) => {
    const session = mongoose.startSession();
    session.startTransaction();
    try {
        const {name, email, password} = req.body;

        //Check if the user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            throw new Error('User already exists');
        }

        //Hash the password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUsers = new User.create([{name, email, password: hashedPassword}, {session}]);

        //Create jwt token
        const token = jwt.sign({userId: newUsers[0].id}, JWT_SECRET, {expiresIn: JWT_EXPIRE_IN});
        await session.commitTransaction();
        await session.endSession();
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {token},
            users: newUsers
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
        await  res.send('Login user');
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