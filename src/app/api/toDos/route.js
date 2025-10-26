import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
    } catch (err) {
        console.error("DB connection error:", err);
        return NextResponse.json(
            { status: "failed", message: "Error in connecting to DB" },
            { status: 500 }
        );
    }

    // Get session from server-side
    const session = await getServerSession();

    if (!session) {
        return NextResponse.json(
            { status: "failed", message: "Unauthorized" },
            { status: 401 }
        );
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
        return NextResponse.json(
            { status: "failed", message: "User not found" },
            { status: 404 }
        );
    }

    // Parse the request body properly
    const body = await request.json();
    const { title, status } = body;

    if (!title || !status) {
        return NextResponse.json(
            { status: "failed", message: "Invalid data" },
            { status: 422 }
        );
    }

    user.toDos.push({ title, status });
    await user.save();
    
    return NextResponse.json(
        { status: "success", message: "ToDo added", toDos: user.toDos },
        { status: 201 }
    );
}