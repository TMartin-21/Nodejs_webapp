const requireOption = require("../requireOption");

/**
 * Return all the agencies from the database 
 * Result is saved in res.locals.agencies
 */
module.exports = function (objectrepository) {
    const AgencyModel = requireOption(objectrepository, 'AgencyModel');
    const HeroModel = requireOption(objectrepository, 'HeroModel');

    return function (req, res, next) {
        AgencyModel.find({}, (err, agencies) => {
            if (err) {
                return next(err);
            }

            res.locals.agencies = agencies;
            return next();
        });
    }
}