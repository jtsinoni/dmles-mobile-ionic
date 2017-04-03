'use strict';

const fs = require('fs.extra'),
      path = require('path');

module.exports = {
    returnIfNotIOSPlatform: function() {
        if(process.length >=5 && process.argv[1].indexOf('cordova') == -1) {
            if(process.argv[4] != 'ios') {
                return; // plugin only meant to work for ios platform.
            }
        }
    },
    getProjectName: function(startPath, filter) {
        var files = fs.readdirSync(startPath);

        for(var i=0; i<files.length; i++) {
            var filename = path.join(startPath, files[i]);

            if(filename.indexOf(filter) >=0 ) {

                // get the file name from a full path
                var realFilename = path.parse(filename).base;

                // remove extension
                var projectName = realFilename.substr(0, realFilename.lastIndexOf('.'));

                return projectName;
            }
        }
    },
    getFullProjectNamePath: function(startPath, filter) {
        var files = fs.readdirSync(startPath);

        for(var i=0; i<files.length; i++) {
            var filename = path.join(startPath, files[i]);

            if(filename.indexOf(filter) >=0 ) {
                return filename;
            }
        }

    }

};
