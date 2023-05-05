import { userModel } from "../../models/user.model";
import { generateHash, verifyHash } from "../../utils/bcrypt.utils";
import { generateToken } from "../../utils/jwt.utils";
import {
    sendErrorResponse,
    sendSuccessResponse,
} from "../../utils/response.utils";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userObj = await userModel.findOne({ email }).select("+password");

        if (!(await verifyHash(password, userObj.password))) {
            throw new Error("Wrong Password");
        }

        const accessToken = await generateToken({
            _id: userObj._id,
            isAdmin: userObj.isAdmin,
        });

        sendSuccessResponse(res, {
            user: { ...userObj.toObject(), password: undefined },
            accessToken,
        });
    } catch (err) {
        sendErrorResponse(res, err.message);
    }
};

export const register = async (req, res) => {
    try {
        const { email, password, fullName } = req.body;

        const hash = await generateHash(password);

        const newUserObj = await userModel.create({
            email,
            password: hash,
            fullName,
        });

        const accessToken = await generateToken({
            _id: newUserObj._id,
            isAdmin: newUserObj.isAdmin,
        });

        sendSuccessResponse(res, { user: newUserObj.toObject(), accessToken });
    } catch (err) {
        sendErrorResponse(res, err.message);
    }
};

export const getAuth = async (req, res) => {
    try {
        const { _id } = req.decoded;

        const userObj = await userModel.findById(_id);

        sendSuccessResponse(res, userObj.toObject());
    } catch (err) {
        sendErrorResponse(res, err.message);
    }
};
