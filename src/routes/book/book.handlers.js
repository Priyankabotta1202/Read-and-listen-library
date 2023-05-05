import {
    sendErrorResponse,
    sendSuccessResponse,
} from "../../utils/response.utils";
import { bookModel } from "../../models/book.model";

export const getBooks = async (req, res) => {
    try {
        const {} = req.query;

        const books = await bookModel.find();

        sendSuccessResponse(res, { books });
    } catch (err) {
        sendErrorResponse(res, err.message);
    }
};

export const addBook = async (req, res) => {
    try {
        const { title, thumbnail, author, url, genre } = req.body;

        const newBookObj = await bookModel.create({
            title,
            thumbnail,
            author,
            url,
            genre,
            uploadedBy: req.decoded._id,
        });

        sendSuccessResponse(res, newBookObj.toObject());
    } catch (err) {
        sendErrorResponse(res, err.message);
    }
};

export const getBookById = async (req, res) => {
    try {
        const { bookId } = req.params;

        const bookObj = await bookModel.findById(bookId);

        sendSuccessResponse(res, bookObj);
    } catch (err) {
        sendErrorResponse(res, err.message);
    }
};

export const uploadBook = (req, res) => {
    try {
        console.log({ files: req.file });

        sendSuccessResponse(res, { url: req.file.path });
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

export const deleteBookById = (req, res) => {
    try {
        sendSuccessResponse(res, req.body);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};

export const updateBookById = (req, res) => {
    try {
        sendSuccessResponse(res, req.body);
    } catch (err) {
        sendErrorResponse(res, err);
    }
};
