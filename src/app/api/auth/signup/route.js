import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  // Connect to DB
  try {
    await connectDB();
  } catch (err) {
    console.error("DB connection error:", err);
    return NextResponse.json(
      { status: "failed", message: "Error in connecting to DB" },
      { status: 500 }
    );
  }

  // Parse body
  let body;
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json(
      { status: "failed", message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { email, password } = body ?? {};

  if (!email || !password) {
    return NextResponse.json(
      { status: "failed", message: "Invalid data" },
      { status: 422 }
    );
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { status: "failed", message: "User exists already!" },
      { status: 422 }
    );
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({ email, password: hashedPassword });
  console.log("Created user:", newUser);

  return NextResponse.json(
    { status: "success", message: "Created user!" },
    { status: 201 }
  );
}