import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import { getServerSession } from "next-auth";

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

        const {name, lastname, password} = await request.json();

        const isValidPassword = await verifyPassword(password, user.password);

        if (!isValidPassword) {
            return NextResponse.json(
                { status: "failed", message: "Invalid password" },
                { status: 403 }
            );
        }

        if (name) user.name = name;
        if (lastname) user.lastname = lastname;
        await user.save();

        return NextResponse.json(
            { status: "success", message: "Profile updated successfully", user: { email: user.email, name: user.name, lastname: user.lastname } },
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
        
