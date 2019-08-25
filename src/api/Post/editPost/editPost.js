import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editPost: async (_, { id, caption, location, action }, { request }) => {
      const user = isAuthenticated(request);

      try {
        const post = await prisma.$exists.post({ id, user: { id: user.id } });

        if (post) {
          if (action == "DELETE") {
            return prisma.deletePost({ id });
          }
          return prisma.updatePost({
            where: { id },
            data: { caption, location }
          });
        } else {
          throw Error("You can not do that");
        }
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  }
};
