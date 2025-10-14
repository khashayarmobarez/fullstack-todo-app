import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {

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
    pages: {
        signIn: "/login"
    }
});

export { handler as GET, handler as POST };