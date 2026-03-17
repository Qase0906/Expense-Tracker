export const globalErrorHandler = (err, req, res ) => {

    res.status(err.statusCode || 500 ).json({
        success: false,
        message: err.message,
        status: err.statusCode
    })

}