import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    bio: {
        type: String,
        default: "",
        maxlength: 200,
    },
    profileImage: {
        type: String,
        default: "https://www.example.com/default-avatar.png",
    },
}, { timestamps: true })

const Admin=mongoose.model("Admin",adminSchema);
export default Admin;