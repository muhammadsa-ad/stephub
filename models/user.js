import mongoose from "mongoose";

let userSchema = mongoose.Schema({
    fullName : String,
    password : String,
    email : String
})

export let User = mongoose.models.user || mongoose.model("user" , userSchema);