import User from '../models/user.model.js';

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({success: true, data: users});
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-passport');
        if(!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
            //return res.status(404).json({success: false, message: 'User not found'});
        }
        res.status(200).json({success: true, data: user});
    } catch (error) {
        next(error);
    }
}