import generateSecret from "../../../Utils/generateSecret";
import { prisma } from "../../../../generated/prisma-client";
import generateToken from "../../../Utils/generateToken";

export default {
  Mutation: {
    register: async (_, { email, password, username, firstName, lastName }) => {
      try {
        const user = await prisma.createUser({
          email,
          password,
          username,
          firstName,
          lastName
        });

        const token = generateToken(user.id);
        return token;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  }
};
