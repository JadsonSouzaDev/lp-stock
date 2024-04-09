import { jwtDecode } from "jwt-decode";
import { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type TokenAPI = {
  userId: string;
  name: string;
  email: string;
  username: string;
  roles: string[];
  accessToken: string;
  refreshToken: string;
};

const authOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials as unknown as {
          username: string;
          password: string;
        };

        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: username,
              password,
            }),
          }
        );
        const user = await resp.json();
        if (resp.ok) {
          return user;
        } else {
          throw new Error(
            JSON.stringify({
              message: "Usuário e/ou senha incorretos",
              status: false,
            })
          );
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    jwt: async ({
      user,
      token,
    }: {
      user: {
        accessToken: string;
        refreshToken: string;
        name: string;
        email: string;
      };
      token: TokenAPI;
    }) => {
      if (user?.accessToken) {
        const decoded = jwtDecode(user.accessToken) as {
          email: string;
          name: string;
          roles: string[];
          userId: string;
        };
        token.userId = decoded.userId;
        token.roles = decoded.roles;
        token.name = decoded.name;
        token.email = decoded.email;
        token.username = decoded.name;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    session: async ({
      session,
      token,
    }: {
      session: {
        user: {
          name: string;
          email: string;
          username: string;
          userId: string;
          roles: string[];
          accessToken: string;
          refreshToken: string;
          isAdmin: boolean;
        };
      };
      token: TokenAPI;
    }) => {
      if (session.user) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.userId = token.userId;
        session.user.roles = token.roles;
        session.user.isAdmin = token.roles.includes("ADMIN");
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
