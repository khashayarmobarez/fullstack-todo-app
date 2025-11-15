import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/utils/auth.config";
import { sortToDos } from "@/utils/sortToDos";

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
    console.log("AddToDo body:", body);
    const { title, description, status } = body;

    if (!title || !status) {
        return NextResponse.json(
            { status: "failed", message: "Invalid data" },
            { status: 422 }
        );
    }

    user.toDos.push({ title, status, description });
    await user.save();
    // Log the saved entry to confirm persistence
    console.log("Saved toDo (last):", user.toDos[user.toDos.length - 1]);
    
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

        const sortedData = sortToDos(user.toDos || []); 

        return NextResponse.json(
            { status: "success", toDos: sortedData },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error fetching todos:", err); // Add this log
        return NextResponse.json(
            { status: "failed", message: err.message || "Error in fetching todos" },
            { status: 500 }
        );
    }
}
   
export async function PATCH(request) {
    
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
        
        const body = await request.json();

        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json(
                { status: "failed", message: "Invalid data" },
                { status: 422 }
            );
        }

        const toDoItem = user.toDos.id(id);
        if (!toDoItem) {
            return NextResponse.json(
                { status: "failed", message: "ToDo item not found" },
                { status: 404 }
            );
        }

        const results = await User.updateOne(
            { email: session.user.email, "toDos._id": id },
            { $set: { "toDos.$.status": status } }
        );

        console.log("Update results:", results);

        return NextResponse.json(
            { status: "success", message: "ToDo updated" },
            { status: 200 }
        );

    } catch (err) {
        console.error("Error patching to dos", err); // Add this log
        return NextResponse.json(
            { status: "failed", message: err.message || "Error in patching todos" },
            { status: 500 }
        );
    }

}

