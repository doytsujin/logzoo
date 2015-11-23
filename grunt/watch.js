"use strict";

module.exports = {
    grunt: {
        files: ['<%= jshint.grunt %>'],
        tasks: ['jshint:grunt'],
        options: {
            reload: true
        }
    },

    newFiles: {
        files: ['<%= jshint.source %>', '<%= jshint.test %>'],
        options: {
            event: ['added'],
            reload: true
        }
    },

    test: {
        files: ['<%= jshint.test %>'],
        tasks: ['jshint:test', 'mochaTest:test']
    },

    source: {
        files: ['<%= jshint.source %>'],
        tasks: ['jshint:source','mochaTest:test']
    }
};
