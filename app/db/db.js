
import mongoose, { connect } from "mongoose";
import { User } from "@/models/user";

export function connectIt() {
    mongoose.connect("mongodb+srv://ali:abc1234567@cluster0.xht8ahs.mongodb.net/zero-master").then(() => {
        console.log("db connected ho gai ha ");
    });
}

export async function getAllUsers() {
    return await User.aggregate([
        {
            $project: {
                fullName: 1,
                email: 1, 

            },
        },
    ]);
}