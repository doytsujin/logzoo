"use strict";

module.exports = {
    options: {
        jshintrc: true
    },

    grunt: ['Gruntfile.js', 'grunt/**/*.js', 'tasks/**/*.js'],

    source: ['src/**/*.js'],

    test: ['test/**/*.js']
};
