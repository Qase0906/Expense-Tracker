export const notFound = (req, res, next) => {

    const error = new Error(`route ${req.originalUrl} not found`)
    error.statusCode = 404

    next(error)

}