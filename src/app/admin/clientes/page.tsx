import { getUsers } from "@/app/api/user/repository";
import { User } from "@/types/user";

import ClientSection from "./section";

export default async function Clients() {
  const data: User[] = await getUsers();
  return <ClientSection data={data} />;
}
