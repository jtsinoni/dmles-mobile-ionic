'use strict';

const utils = require('./utils'),
      fs = require('fs.extra'),
      path = require('path');

module.exports = function(context) {
    utils.returnIfNotIOSPlatform();

    console.log('Running hook => copyTools.js');

    var file = 'incore_macho';
    var sourceDir = 'CACPlugin/tools/ios';
    var destDir = 'platforms/ios/Tools';

    var source = path.join(sourceDir, file);
    var dest = path.join(destDir, file);

    fs.copy(source, dest, { replace: true }, function (err) {
        if (err) {
            throw err;
        }
        fs.chmod(dest, '0755');
        //console.log('Created file => ' + dest);
    });

}
