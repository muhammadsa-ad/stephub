import { User } from "@/models/user"; // Adjust the path as necessary
import { NextResponse } from "next/server";

export async function GET(req) {
    const users = await User.find(); // Fetch all users
    return NextResponse.json(users, );
}

// You can add other methods (POST, etc.) as needed, but remove the DELETE method.