import bcrypt from "bcrypt";

export const BCRYPT = {
  hash: async (password: string) => bcrypt.hash(password, 10),
  compare: async (password: string, hash: string) =>
    bcrypt.compare(password, hash),
};
