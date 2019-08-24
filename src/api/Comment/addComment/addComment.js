import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addComment: async (_, { text, postId }, { request }) => {
      const user = isAuthenticated(request);

      const comment = await prisma.createComment({
        text,
        user: { connect: { id: user.id } },
        post: { connect: { id: postId } }
      });

      return comment;
    }
  }
};
