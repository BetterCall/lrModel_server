import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    me: (_, __, { request }) => {
      const user = isAuthenticated(request);

      return prisma.user({ id: user.id });
    }
  }
};
