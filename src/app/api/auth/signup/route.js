import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import { NextResponse } from "next/server";

async function handler(req, res) {
  if (req.method !== "POST") return;

  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { status: "failed", message: "Error in connecting to DB" },
      { status: 500 }
    );
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return NextResponse.json(
      { status: "failed", message: "Invalid data" },
      { status: 422 }
    );
  }

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return NextResponse.json(
      { status: "failed", message: "User exists already!" },
      { status: 422 }
    );
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({ email: email, password: hashedPassword });
  console.log(newUser);

  return NextResponse.json(
    { status: "success", message: "Created user!" },
    { status: 201 }
  );
}

export default handler;