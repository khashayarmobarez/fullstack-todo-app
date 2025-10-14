import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Replace with your own user authentication logic
                if (
                    credentials.username === "admin" &&
                    credentials.password === "password"
                ) {
                    return { id: 1, name: "Admin", email: "admin@example.com" };
                }
                return null;
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