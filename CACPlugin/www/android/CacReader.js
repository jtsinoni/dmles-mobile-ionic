var exec = require('cordova/exec');

var CacReader = {
    version: function(success, error) {
        exec(success, error, "CDVCacReader", "version", []);
    },
    isReaderAttached: function (success, error) {
        exec(success, error, "CDVCacReader", "isReaderAttached", []);
    },
    isCardInserted: function (success, error) {
        exec(success, error, "CDVCacReader", "isCardInserted", []);
    },
    lockScreen: function (success, error) {
        exec(success, error, "CDVCacReader", "lockScreen", []);
    },
    setFipsMode: function (fipsMode, success, error) {
        exec(success, error, "CDVCacReader", "setFipsMode", [fipsMode]);
    },
    cacCheck: function (host, success, error) {
        exec(success, error, "CDVCacReader", "cacCheck", [host]);
    },
    sendPost: function (host, postData, headers, success, error) {
        exec(success, error, "CDVCacReader", "sendPost", [host, postData, headers]);
    },
    sendGet: function (host, headers, success, error) {
        exec(success, error, "CDVCacReader", "sendGet", [host, headers]);
    }

};

module.exports = CacReader;
