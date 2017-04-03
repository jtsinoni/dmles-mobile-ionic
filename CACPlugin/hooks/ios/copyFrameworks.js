'use strict';

const utils = require('./utils'),
      fs = require('fs.extra'),
      path = require('path');

module.exports = function(context) {
    utils.returnIfNotIOSPlatform();

    console.log('Running hook => copyFrameworks.js');

    var baseDir = 'Framework';
    var sourceDir = path.join('CACPlugin/config/ios', baseDir);
    var destDir = path.join('platforms/ios/PKardSDK', baseDir);

    // Check if dest dir exists, remove if it does
    if (fs.existsSync(destDir)){
        fs.rmrfSync(destDir)
    }

    fs.copyRecursive(sourceDir, destDir, function (err) {
        if(err) {
            throw err;
        }
        //console.log('Created dir => ' + destDir);
    });

}
