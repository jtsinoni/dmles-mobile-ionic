#import <Cordova/CDV.h>
#import <PKardSDK/PKardSDK.h>
#import <PKardSDK/Logging.h>
#import "CDVCacReader.h"

@implementation CDVCacReader

- (void) version:(CDVInvokedUrlCommand *)command {
    CDVPluginResult* pluginResult = nil;

    NSString *version = PKardSDK_Version();
    if(version != nil) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:version];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR];
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

}

- (void)pluginInitialize {
    if (PKardSDK_IsInstalled()) {
        PKardSDK_Initialize(NO);

        // log all debug messages (7)
        TSSLogLevelSet(7);

        PKardSDK_RegisterHTTPS();

        // Allows PKard SDK to put up user interface dialogs or views such as the PIN entry view
        PKardSDK_MayDisplayUserInterface(YES);
    } else {
        // Show alert in cordova that the  "PKard Reader not installed"
    }
}
@end
