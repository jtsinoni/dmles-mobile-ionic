package logicole.plugin.cac;

import org.apache.cordova.LOG;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class CDVCacReader extends CordovaPlugin {

    private static final String LOG_TAG = "CDVCacReader";

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        LOG.d(LOG_TAG, "Starting => " + LOG_TAG);
        // Initialize CAC Reader here
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

        LOG.d(LOG_TAG, "Action: " + action);
        if (action.equals("version")) {
            this.version(callbackContext);
            return true;
        }
        return false;
    }

    private void version(CallbackContext callbackContext) {
        // TODO: get from PKard SDK
        String version = "PKard Version x.x.x";

        if(version != null) {
            callbackContext.success(version);
        } else {
            callbackContext.error("No version set by Thursby PKard.");
        }
    }
}
