import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    unfollow: async (_, { id }, { request }) => {
      const user = isAuthenticated(request);

      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: { following: { disconnect: { id } } }
        });

        return true;
      } catch (error) {
        console.log(error);

        return false;
      }
    }
  }
};
