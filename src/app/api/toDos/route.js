import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/utils/auth.config";

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

    // Get session from server-side with auth options
    const session = await getServerSession(authOptions);

    console.log("Session:", session); // Debug log

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

export async function GET() {
    try {
        await connectDB();

        const session = await getServerSession(authOptions);

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

        return NextResponse.json(
            { status: "success", toDos: user.toDos },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { status: "failed", message: "Error in fetching todos" },
            { status: 500 }
        );
    }
}
        