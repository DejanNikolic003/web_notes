import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing!" });
    }

    const token = authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById({ _id: decode._id });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid token: User not found!" });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message:
        error.name === "TokenExpiredError"
          ? "Token has expired!"
          : "Invalid token!",
    });
  }
};
