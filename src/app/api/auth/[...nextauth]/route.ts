import NextAuth, { AuthOptions } from "next-auth";

import authOptions from "@/lib/auth";

const handler = NextAuth(authOptions as unknown as AuthOptions);
export { handler as GET, handler as POST };
