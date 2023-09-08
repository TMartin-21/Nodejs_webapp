/**
 * Delete a hero, based on its :heroid from the database
 * Redirect -> /heroes/:agencyid
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.hero === 'undefined') {
            return next();
        }

        res.locals.hero.remove((err) => {
            if (err) {
                return next();
            }
            res.locals.agency.numberOfHeroes -= 1;
            res.locals.agency.save((err) => {
                if (err) {
                    return next(err);
                }
            });
            return res.redirect('/heroes/' + res.locals.agency._id);
        });
    }
}