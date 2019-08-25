import { prisma } from "../../../../generated/prisma-client";
import generateToken from "../../../Utils/generateToken";

export default {
  Mutation: {
    confirmSecret: async (_, { secret, email }, { request }) => {
      console.log(request.user);
      const user = await prisma.user({ email });
      if (user.secret === secret) {
        await prisma.updateUser({
          where: { id: user.id },
          data: { secret: null }
        });
        const token = generateToken(user.id);
        console.log("token", token);
        return token;
      } else {
        throw Error("Wrong email / secret");
      }
    }
  }
};
