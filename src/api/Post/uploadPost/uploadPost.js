import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    uploadPost: async (_, { caption, files }, { request }) => {
      const user = isAuthenticated(request);

      try {
        const post = await prisma.createPost({
          caption,
          user: { connect: { id: user.id } }
        });
        files.forEach(async file => {
          await prisma.createFile({
            url: file,
            post: {
              connect: { id: post.id }
            }
          });
        });

        return post;
      } catch (error) {
        console.log(error);

        return null;
      }
    }
  }
};
