const successResponse = (res, data, statusCode = 200) => {
    res.status(statusCode).json({
        error: false,
        status: statusCode,
        body: data
    });
};

const errorResponse = (res, message, statusCode = 500) => {
    res.status(statusCode).json({
        error: true,
        status: statusCode,
        body: message
    });
};

module.exports = { successResponse, errorResponse };