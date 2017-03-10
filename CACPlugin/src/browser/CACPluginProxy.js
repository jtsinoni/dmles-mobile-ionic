var CACPlugin = {
    coolMethod: function (cbSuccess, cbError, options) {
        cbSuccess(options);
    }
};

module.exports = CACPlugin;
require("cordova/exec/proxy").add("CACPlugin", CACPlugin);

