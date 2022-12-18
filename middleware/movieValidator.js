

exports.movieReqVal = (req, res, next) => {
    if(!req.body) {
        res.status(400).send(`body required!`);
    }
    if(!req.body.name) {
        res.status(400).send(`name required!`);
    }
    if(!req.body.description) {
        res.status(400).send(`description required!`);
    }
    if(!req.body.casts) {
        res.status(400).send(`casts required!`);
    }
    if(!req.body.releaseDate) {
        res.status(400).send(`releaseDate required!`);
    }
    if(!req.body.releaseStatus) {
        res.status(400).send(`releaseStatus required!`)
    }
    if(!req.body.director) {
        res.status(400).send(`director required!`)
    }
    if(!req.body.language) {
        res.status(400).send(`language required!`)
    }

    next();
}

