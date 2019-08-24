import generateSecret from "../../../Utils/generateSecret";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecret: async (_, { email }) => {
      const secret = generateSecret();

      try {
        await prisma.updateUser({ data: { secret }, where: { email } });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
