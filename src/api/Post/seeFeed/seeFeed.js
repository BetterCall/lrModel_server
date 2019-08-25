import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFeed: async (_, __, { request }) => {
      const user = isAuthenticated(request);

      const following = await prisma.user({ id: user.id }).following();
      return prisma.posts({
        where: { user: { id_in: [...following.map(u => u.id), user.id] } },
        orderBy: "createdAt_DESC"
      });
    }
  }
};
