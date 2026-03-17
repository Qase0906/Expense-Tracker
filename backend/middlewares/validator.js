

export const validator = (schema) => (req, res, next) => {

    const result = schema.safeParse(req.body);

    if(!result.success) {
        const formatted = result.error.format()
        
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            error: Object.keys(formatted).map((field) => ({
                field,
                error: formatted[field]?._errors?.[0]
            }))
        }) 

    }

    next()

}