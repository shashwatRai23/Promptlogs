import User from "@models/user";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/database";
import bcrypt from "bcryptjs";

export async function POST(req){
    try {
        const { username, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectToDatabase();
        await User.create({
            username,
            email,
            password: hashedPassword,
        });
        return NextResponse.json({message: "User registered successfully"},{status: 201});
    } catch (e) {
        return NextResponse.json({message: "An error occurred while registering the user"},{status: 500});
    }
}