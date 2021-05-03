
module.exports = class HttpError extends Error
{
    constructor(message, statusCode = 400, errorCode = 0)
    {
        super(message);
        if (statusCode) this.statusCode = statusCode;
        if (errorCode) this.errorCode = errorCode;
    }
};