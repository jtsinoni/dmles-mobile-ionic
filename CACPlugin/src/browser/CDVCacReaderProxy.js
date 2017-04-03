var CacReader = {
    version: function (success, error) {
        success("TODO: Get PKard Version");
    }
};

module.exports = CacReader;
require("cordova/exec/proxy").add("CacReader", CacReader);

