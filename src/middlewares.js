export const isAuthenticated = request => {
  if (!request.user) {
    throw Error("You need to be authenticated");
  }

  return request.user;
};
