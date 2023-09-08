const requireOption = require("../requireOption");

/**
 * Return an agency from the database, using :agencyid
 */
module.exports = function (objectrepository) {
    const AgencyModel = requireOption(objectrepository, 'AgencyModel');

    return function (req, res, next){
        AgencyModel.findOne({ _id: req.params.agencyid }, (err, agency) => {
            if (err || !agency) {
                return next(err);
            }

            res.locals.agency = agency;
            return next();
        });
    }
}