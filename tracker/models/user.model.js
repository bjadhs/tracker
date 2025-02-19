import {model, Schema} from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address'],

    },
    password: {
        type: String,
        minLength: 6,
    }
}, {timestamps: true});



const User = model('User', userSchema);

export default User;