
import { NextResponse } from "next/server";
import { ConnectMongo } from "@/app/util/database";
import User from "@/app/model/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {


    const { name, email, password } = await req.json();

        if (!name || !email || !password) {
          return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        await ConnectMongo();

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

    // Hash the password once
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user once with all fields
    await User.create({ 
      name, 
      email, 
      password: hashedPassword 
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}