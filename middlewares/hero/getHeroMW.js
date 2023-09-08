const requireOption = require("../requireOption");

/**
 * Return a hero from the database, using :heroid
 */
module.exports = function (objectrepository) {
    const HeroModel = requireOption(objectrepository, 'HeroModel');
    
    return function (req, res, next) {
        HeroModel.findOne({ _id: req.params.heroid }, (err, hero) => {
            if (err || !hero) {
                return next(err);
            }

            res.locals.hero = hero;
            return next();
        });
    }
}