import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { email, password } = credentials ?? {};

                try {
                    await connectDB();
                } catch (err) {
                    console.error("DB connection error:", err);
                    return null;
                }

                if(!email || !password) {
                    return null;
                }

                const user = await User.findOne({ email });
                if (!user) {
                    return null;
                }

                const isValid = await verifyPassword(password, user.password);
                if (!isValid) {
                    return null;
                }

                return { email: user.email };
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signIn"
    }
};