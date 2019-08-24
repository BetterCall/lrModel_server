import { prisma } from "../../../../generated/prisma-client";
import generateToken from "../../../Utils/generateToken";

export default {
  Mutation: {
    confirmSecret: async (_, { secret, email }, { request }) => {
      console.log(request.user);
      const user = await prisma.user({ email });
      if (user.secret === secret) {
        const token = generateToken(user.id);
        console.log("token", token);
        return token;
      } else {
        throw Error("Wrong email / secret");
      }
    }
  }
};
