import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "@/types/user";

import { getUserByEmail, getUserById } from "./repository";

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
