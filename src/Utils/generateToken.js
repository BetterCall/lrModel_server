import jwt from "jsonwebtoken";

export default id => {
  console.log("process.env.JWT_SECRET token", process.env.JWT_SECRET);
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
