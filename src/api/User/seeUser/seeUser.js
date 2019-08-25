import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, { id }, { request }) => {
      const user = isAuthenticated(request);

      return prisma.user({ id });
    }
  }
};
