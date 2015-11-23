"use strict";

module.exports = function (grunt) {
    const gtx = require('gruntfile-gtx').wrap(grunt);

    gtx.loadAuto();

    let gruntConfig = require('./grunt');
    gruntConfig.package = require('./package.json');
    gtx.config(gruntConfig);

    gtx.alias('default', ['watch']);

    gtx.finalise();
};
