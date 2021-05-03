module.exports = exceptionHandler = (fn) => (req, res, next) =>
{
    fn(req, res).catch((err) => next(err));
};