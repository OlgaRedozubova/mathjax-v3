const PACKAGE = require('../../webpack.common.js');

module.exports = PACKAGE(
    'combined',                         // the package to build
    '../../../mathjax3',                // location of the mathjax3 library
    [],                                 // packages to link to
    __dirname,                          // our directory
    '.'                                 // dist directory
);
