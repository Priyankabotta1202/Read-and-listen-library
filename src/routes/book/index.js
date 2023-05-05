import { Router } from "express";
import { verifyAdmin, verifyJWT } from "../../utils/jwt.utils";
import { upload } from "../../utils/multer.utils";
import {
    addBook,
    deleteBookById,
    getBookById,
    getBooks,
    updateBookById,
    uploadBook,
} from "./book.handlers";

const bookRouter = Router();

bookRouter.get("/", getBooks);
bookRouter.post("/", verifyJWT, verifyAdmin, addBook);
bookRouter.post("/upload", verifyJWT, verifyAdmin, upload, uploadBook);
bookRouter.get("/:bookId", verifyJWT, getBookById);
bookRouter.post("/:bookId", verifyJWT, verifyAdmin, updateBookById);
bookRouter.delete("/:bookId", verifyJWT, verifyAdmin, deleteBookById);

export default bookRouter;
