import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;
