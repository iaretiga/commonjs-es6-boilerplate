var jstransform = require('jstransform');

var visitors = [
    require('jstransform/visitors/es6-arrow-function-visitors'),
    require('jstransform/visitors/es6-class-visitors'),
    require('jstransform/visitors/es6-object-short-notation-visitors'),
    require('jstransform/visitors/es6-rest-param-visitors'),
    require('jstransform/visitors/es6-template-visitors')
].reduce(function(visitors, visitor) {
    return visitors.concat(visitor.visitorList);
}, []);

module.exports = {
    process: function(src, path) {
        console.log('transforming ' + path);
        return jstransform.transform(visitors, src).code;
    }
};
