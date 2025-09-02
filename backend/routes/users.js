import Router from "express";
import {
  login,
  logout,
  register,
  refresh,
  test,
  me,
} from "../controllers/users.js";
import { isAuthenticated } from "../middlewares/auth.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout", isAuthenticated, logout);
userRouter.get("/test", isAuthenticated, test);
userRouter.get("/me", isAuthenticated, me);
userRouter.get("/refresh", refresh);

export default userRouter;
