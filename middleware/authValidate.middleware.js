exports.authBodyValidate = (req, res, next) => {
    const body = req.body;
    if (!body.name || !body.email || !body.password) {
        return res.status(400).send({
            message: "Bad request!"
        })
    }
    next()
}