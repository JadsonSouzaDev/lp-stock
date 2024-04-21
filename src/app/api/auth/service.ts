import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "@/types/user";

import {
  createUser,
  getUserByEmail,
  getUserById,
  getUserByPhone,
} from "./repository";

export type UserSignup = {
  name: string;
  phone: string;
  password: string;
  email: string;
};

const generateToken = async (user: User) => {
  const accessToken = jwt.sign(
    { userId: user.id, email: user.email, name: user.name, roles: user.roles },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "1h",
    }
  );
  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "1d",
    }
  );
  return { accessToken, refreshToken };
};

export const login = async (email: string, password: string) => {
  const user = await getUserByEmail(email);

  if (user && bcrypt.compareSync(password, user.password)) {
    return generateToken(user);
  } else {
    throw new Error("Usuário ou senha inválidos");
  }
};

export const signup = async (userData: UserSignup) => {
  const userByEmail = await getUserByEmail(userData.email);
  const userByPhone = await getUserByPhone(userData.phone);

  if (userByEmail || userByPhone) {
    throw new Error("Usuário já cadastrado com esses dados");
  }

  const password = bcrypt.hashSync(userData.password, 10);

  const newUser = await createUser({
    ...userData,
    password,
  });

  return generateToken(newUser);
};

export const acquireNewToken = async (refreshToken: string) => {
  const decoded = jwt.verify(
    refreshToken,
    process.env.SECRET_KEY as string
  ) as { userId: string };

  const user = await getUserById(decoded.userId);

  if (user) {
    return generateToken(user);
  } else {
    throw new Error("Usuário não encontrado ou refreshToken inválido");
  }
};

export const isAuthenticated = async (req: Request) => {
  const headers = req.headers;
  const authorization = headers.get("Authorization");
  const token = authorization?.split(" ")[1];
  const decodedToken = jwt.decode(token ?? "") as { userId: string };

  const userId = decodedToken?.userId;
  if (!userId) {
    throw new Error("Usuário não autenticado", { cause: "no_auth" });
  }

  return decodedToken;
};
