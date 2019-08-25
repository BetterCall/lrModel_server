import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFullPost: (_, { id }) => {
      return prisma.post({ id });
    }
  }
};
