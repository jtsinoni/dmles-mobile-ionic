/********* CACPlugin.m Cordova Plugin Implementation *******/

#import <Cordova/CDV.h>
#import <PKardSDK/PKardSDK.h>
#import <PKardSDK/Logging.h>

@interface CACPlugin : CDVPlugin {
  // Member variables go here.
}

- (void)coolMethod:(CDVInvokedUrlCommand*)command;
@end

@implementation CACPlugin

- (void)coolMethod:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSString* echo = [command.arguments objectAtIndex:0];

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

    if (echo != nil && [echo length] > 0) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:echo];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
