import generateSecret from "../../../Utils/generateSecret";
import { prisma } from "../../../../generated/prisma-client";
import generateToken from "../../../Utils/generateToken";

export default {
  Mutation: {
    facebookLogin: async (_, { fbId, email, firstName, lastName }) => {
      try {
        let user = await prisma.user({ fbId });

        // User already exist return auth token
        if (user) {
          const token = generateToken(user.id);
          return token;
        }

        user = await prisma.user({ email });
        if (user) {
          if (user.fbId !== fbId) {
            await prisma.updateUser({ where: { email }, data: { fbId } });
          }

          const token = generateToken(user.id);
          return token;
        }
        // else create new account
        user = await prisma.createUser({
          fbId,
          email,
          firstName,
          lastName
        });

        const token = generateToken(user.id);
        return token;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  }
};
