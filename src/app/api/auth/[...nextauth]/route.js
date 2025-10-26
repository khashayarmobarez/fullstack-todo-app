import NextAuth from "next-auth";
import { authOptions } from "@/utils/auth.config";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };