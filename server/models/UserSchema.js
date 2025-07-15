import mongoose from "mongoose";


const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    isImportant: {
        type: Boolean,
        default: false
    },
    id: {
        type: String,
        required: true
    }
})


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: null,
        select: false
    },
    picture: {
        type: String,
        default: null,
    },
    status: {
        reset: {
            token: { type: String },
            expiry: { type: Date },
        },
        verified: {
            type: Boolean,
            default: false
        },
        verify: {
            token: String,
            expiry: Date
        }
    },
    tasks: [TaskSchema]
})


export const User = mongoose.model("User", UserSchema, "users")