import { prisma } from "../../../../generated/prisma-client";
import generateToken from "../../../Utils/generateToken";

export default {
  Mutation: {
    login: async (_, { email, password }, { request }) => {
      console.log(request.user);
      const user = await prisma.user({ email });
      if (!user || user.password !== password) {
        throw Error("Invalid Login");
      } else {
        const token = generateToken(user.id);
        return token;
      }
    }
  }
};
