import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";

export async function POST(request, response) {

    try {
        await connectDB();
    } catch (err) {
        console.error("DB connection error:", err);
        return new Response(
            JSON.stringify({ status: "failed", message: "Error in connecting to DB" }),
            { status: 500 }
        );
    }

    const session = await getSession(request);

    if (!session) {
        return new Response(
            JSON.stringify({ status: "failed", message: "Unauthorized" }),
            { status: 401 }
        );
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
        return new Response(
            JSON.stringify({ status: "failed", message: "User not found" }),
            { status: 404 }
        );
    }

    const { title, status } = await request.body;

    if(!title || !status) {
        return new Response(
            JSON.stringify({ status: "failed", message: "Invalid data" }),
            { status: 422 }
        );
    } else {
        user.toDos.push({ title, status });
        await user.save();
        
        return new Response(
            JSON.stringify({ status: "success", message: "ToDo added", toDos: user.toDos }),
            { status: 201 }
        );
    }
}