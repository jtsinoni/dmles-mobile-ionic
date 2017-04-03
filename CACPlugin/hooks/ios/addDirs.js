'use strict';

const utils = require('./utils'),
    fs = require('fs');

module.exports = function(context) {
    if(process.length >=5 && process.argv[1].indexOf('cordova') == -1) {
        if(process.argv[4] != 'ios') {
            return; // plugin only meant to work for ios platform.
        }
    }
    console.log('Running hook => addDirs.js');

    var dirs = ['platforms/ios/Tools', 'platforms/ios/PKardSDK'];
    dirs.forEach(function(dir, index) {
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);

            //console.log('Created dir => ' + dir);
        }
    });
}
