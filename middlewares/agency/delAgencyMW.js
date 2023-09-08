/**
 * Delete an agency, based on its :agencyid from the database
 * Redirect -> /agency
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (res.locals.agency === 'undefined'){
            return next();
        }
        
        res.locals.agency.remove((err) => {
            if (err) {
                return next(err);
            }

            res.locals.heroes.forEach(element => {
                element.remove((err) => {
                    if (err) {
                        return next(err);
                    }
                })
            });
            
            return res.redirect('/agency');
        });
    }
}