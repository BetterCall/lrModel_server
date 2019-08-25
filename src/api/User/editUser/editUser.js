import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (
      _,
      { username, firstName, lastName, email, bio },
      { request }
    ) => {
      const user = isAuthenticated(request);

      return prisma.updateUser({
        where: { id: user.id },
        data: { username, firstName, lastName, email, bio }
      });
    }
  }
};
