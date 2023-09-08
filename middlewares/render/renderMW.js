/**
 * Render the views
 */
module.exports = function (objectrepository, viewName) {
    return function (req, res, next){
        console.log('render: ' + viewName);
        res.render(viewName, res.locals);
    }
}