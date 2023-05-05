function sendSuccessResponse(res, data, message = "Success") {
    res.status(200).json({
        data,
        status: true,
        message,
    });
}

function sendErrorResponse(
    res,
    errors,
    message = "Something Went Wrong",
    status = 406
) {
    console.log({ errors });
    res.status(status).json({
        data: errors,
        status: false,
        message,
    });
}

function sendEmptyResponse(res, data) {
    res.status(204).json({
        data,
        status: false,
        message: "No Data",
    });
}

export { sendSuccessResponse, sendEmptyResponse, sendErrorResponse };
