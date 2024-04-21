import bcrypt from "bcrypt";

import {
  ProfileForm,
  UpdatePasswordForm,
} from "@/app/perfil/components/ProfileSection/type";

import { getUserById } from "../../auth/repository";
import {
  getUserByEmail,
  getUserByPhone,
  updateProfile as updateUser,
  updatePassword as updateUserPassword,
} from "../repository";

export const updateProfile = async (id: string, user: ProfileForm) => {
  const userEmail = await getUserByEmail(user.email);
  const userPhone = await getUserByPhone(user.phone);

  if (userEmail?.id !== id) {
    throw new Error("Já existe um usuário com este email");
  }
  if (userPhone?.id !== id) {
    throw new Error("Já existe um usuário com este telefone");
  }

  return await updateUser(id, user);
};

export const updatePassword = async (id: string, form: UpdatePasswordForm) => {
  const user = await getUserById(id);
  if (!bcrypt.compareSync(form.currentPassword, user.password)) {
    throw new Error("Senha atual inválida");
  }

  const password = bcrypt.hashSync(form.newPassword, 10);
  return await updateUserPassword(id, password);
};
