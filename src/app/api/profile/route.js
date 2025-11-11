import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import { authOptions } from "@/utils/auth.config";

export async function POST(request) {
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

        const {name, lastName, password} = await request.json();

        if (!password) {
            return NextResponse.json(
                { status: "failed", message: "Password is required" },
                { status: 400 }
            );
        }

        const isValidPassword = await verifyPassword(password, user.password);

        if (!isValidPassword) {
            return NextResponse.json(
                { status: "failed", message: "Invalid password" },
                { status: 403 }
            );
        }

        if (name) user.name = name;
        if (lastName) user.lastName = lastName;
        await user.save();

        return NextResponse.json(
            { status: "success", message: "Profile updated successfully", user: { email: user.email, name: user.name, lastName: user.lastName } },
            { status: 200 },
        );
    } catch (err) {
        console.error("Error fetching profile:", err);
        return NextResponse.json(
            { status: "failed", message: err.message || "Error in fetching profile" },
            { status: 500 }
        );
    }
}


export async function GET(request) {
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
            { status: "success", data: { email: user.email, name: user.name, lastName: user.lastName } },
            { status: 200 },
        );
    } catch (err) {
        console.error("Error fetching profile:", err);
        return NextResponse.json(
            { status: "failed", message: err.message || "Error in fetching profile" },
            { status: 500 }
        );
    }
}
