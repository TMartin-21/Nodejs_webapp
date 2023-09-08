module.exports = function(objectrepository, propertyName) {
    if (objectrepository && objectrepository[propertyName]){
        return objectrepository[propertyName];
    }
    throw new TypeError(propertyName + ' required');
};