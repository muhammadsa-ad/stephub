import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
    let data = await req.json();
    const { action } = data; 

    if (action === "signup") {
        return await handleSignup(data);
    } else if (action === "login") {
        return await handleLogin(data);
    } else {
        return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }
}

async function handleSignup(data) {
    const { fullName, password, email } = data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    let newUser = new User({
        fullName,
        password, 
        email,
    });

    await newUser.save();
    console.log("User Saved");

    const { password: _, ...userData } = newUser.toObject();
    return NextResponse.json(userData);
}

async function handleLogin(data) {
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.password !== password) {
        return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    const { password: _, ...userData } = user.toObject();
    return NextResponse.json(userData);
}
