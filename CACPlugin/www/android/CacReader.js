var exec = require('cordova/exec');

var CacReader = {
    version: function(success, error) {
        exec(success, error, "CDVCacReader", "version", []);
    }
    // ,
    // isReaderAttached: function (success, error) {
    //     exec(success, error, "CDVCacReader", "isReaderAttached", []);
    // },
    // isCardInserted: function (success, error) {
    //     exec(success, error, "CDVCacReader", "isCardInserted", []);
    // },
    // getLockSignature: function (success, error) {
    //     exec(success, error, "CDVCacReader", "getLockSignature", []);
    // },
    // setLockSignature: function (success, error) {
    //     exec(success, error, "CDVCacReader", "setLockSignature", []);
    // },
    // removeLockSignature: function (success, error) {
    //     exec(success, error, "CDVCacReader", "removeLockSignature", []);
    // },
    // lockScreen: function (success, error) {
    //     exec(success, error, "CDVCacReader", "lockScreen", []);
    // }
};

module.exports = CacReader;
