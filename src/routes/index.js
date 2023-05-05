import { Router } from "express";
import authRouter from "./auth";
import bookRouter from "./book";

const router = Router();

router.use("/auth", authRouter);
router.use("/books", bookRouter);

export default router;
