'use strict';

const utils = require('./utils'),
      fs = require('fs.extra'),
      path = require('path');

module.exports = function(context) {
    utils.returnIfNotIOSPlatform();

    console.log('Running hook => copyConfigs.js');

    var projectName = utils.getProjectName('platforms/ios', '.xcodeproj');
    //console.log('project name => ' + projectName);

    // // files, dirs to copy
    var files = ['fips_premain.c'];

    var sourceDir = 'CACPlugin/config/ios';
    var destDir = path.join(context.opts.projectRoot, 'platforms/ios');

    files.forEach(function(file, index) {
        var source = path.join(sourceDir, file);
        var dest = path.join(destDir, file);

        var stat = fs.lstatSync(source);
        if(stat.isDirectory()) {
            // Check if dest dir exists, remove if it does
            if (fs.existsSync(dest)){
                fs.rmrfSync(dest)
            }

            fs.copyRecursive(source, dest, function (err) {
                if(err) {
                    throw err;
                }
                //console.log('Created dir => ' + dest);
            });

        } else {
            fs.copy(source, dest, { replace: true }, function (err) {
                if (err) {
                    throw err;
                }
                //console.log('Created file => ' + dest);
            });
        }
    });

}
