var jstransform = require('jstransform');

var visitors = require('./jstransformVisitors')
    .map(function(visitorFile) {
        return require(visitorFile);
    })
    .reduce(function(visitors, visitor) {
        return visitors.concat(visitor.visitorList);
    }, []);

module.exports = {
    process: function(src, path) {
        return jstransform.transform(visitors, src).code;
    }
};
