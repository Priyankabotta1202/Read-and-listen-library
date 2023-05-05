import { Router } from "express";
import { verifyJWT } from "../../utils/jwt.utils";
import { getAuth, login, register } from "./auth.handlers";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/", verifyJWT, getAuth);

export default authRouter;
