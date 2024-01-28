import { NextResponse } from "next/server";

import connectDB from "@/utils/dbConnect";
import bcrypt from "bcryptjs";
import User from "@/models/User";

export const POST = connectDB(async (request) => {
    const { email, password, username } = await request.json();

    // await connect();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return NextResponse.json({ status: false, error: 'Email is already in use' }, { status: 400 })
        // return  NextResponse("Email is already in use", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({
        email,
        username,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        return NextResponse.json({
            success: true,
            message: 'User is Successfully Registered'
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ err, error: 'Something Went Wrong' }, {
            status: 500,
        });
    }
});