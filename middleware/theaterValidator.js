
exports.theaterReqVal = (req, res, next) => {
    if(!req.body) {
        res.status(400).send(`body required`);
    }
    if(!req.body.name) {
        res.status(400).send(`name required!`);
    }
    if(!req.body.description) {
        res.status(400).send(`description required!`);
    }
    if(!req.body.city) {
        res.status(400).send(`city required!`);
    }
    if(!req.body.pincode) {
        res.status(400).send(`pincode required!`);
    }

    next();
}
