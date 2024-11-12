import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    username: string ;
    email: string;
    admin: boolean;
    password: string;
}

export interface IDataModel extends mongoose.Model<IUser> {}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: true,
    },
});

export default mongoose.model<  IUser, IDataModel>("User", userSchema);