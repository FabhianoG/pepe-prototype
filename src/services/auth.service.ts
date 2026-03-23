import type { User } from "../types/user";

const users: User[] = [
  {
    id: 1,
    name: "Admin",
    email: "admin@test.com",
    password: "Protecso123",
  },
  {
    id: 2,
    name: "Fabiano",
    lastName: "Guerrero",
    email: "fabiano.guerrero@protecso.com.pe",
    password: "Protecso123",
    empresa: "Protecso",
  },
];

export const login = (email: string, password: string): User | null => {
  const user = users.find(
    (u) => u.email === email && u.password === password
  );
  return user || null;
};
