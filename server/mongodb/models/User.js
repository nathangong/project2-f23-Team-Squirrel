import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: { // Ensure this is defined correctly
        type: Boolean,
        required: true
    }
});

export default mongoose.models?.User || mongoose.model("User", userSchema);
