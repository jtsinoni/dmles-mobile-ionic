#import <Cordova/CDV.h>
#include <PKardSDK/PKardSDK.h>
#include <PKardSDK/TokenState.h>
#import <PKardSDK/Logging.h>
#import "CDVCacReader.h"


@interface CDVCacReader ()
{
    id  tokenObserver;
}

- (void)tokenChanged:(NSNotification*)notification;
- (void)establishLockSignature;
@end

@implementation CDVCacReader

//@synthesize state = _state;
//@synthesize challengeData;
@synthesize identity = _identity;
@synthesize userMessage = _userMessage;

- (id)init
{
    self = [super init];
    if(self) {
    }
    return self;
}

- (void)dealloc {
    if(tokenObserver) {
        [[NSNotificationCenter defaultCenter] removeObserver:tokenObserver];
    }
}

- (void)setEnabled:(BOOL)isEnabled {
    if(isEnabled) {
        /*
         * observe card reader and token events
         */
        tokenObserver = [[NSNotificationCenter defaultCenter]
                         addObserverForName:PKardSDKTokenStateChangedNotice
                         object:nil
                         queue:[NSOperationQueue mainQueue]
                         usingBlock:^(NSNotification *note) {
                             [self tokenChanged:note];
                         }];
        // kick things off
        [self tokenChanged:nil];
    } else {
        if(tokenObserver) {
            [[NSNotificationCenter defaultCenter] removeObserver:tokenObserver];
        }
        tokenObserver = nil;
    }
}

- (void)establishLockSignature {
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        TSS_PKI_Signature* signature = [TSS_PKI_Identity identityProofRecord:nil];
        NSDictionary* signatureProperties = [signature properties];
        [[NSUserDefaults standardUserDefaults] setObject:signatureProperties forKey:@"lockSignature"];

        if(signature != nil) {
            NSLog(@"signature => '%@'", signature);

        } else {
            NSLog(@"Signature is Null");
        }
    });


}

- (void) version:(CDVInvokedUrlCommand *)command {
    CDVPluginResult* pluginResult = nil;

    NSString *version = PKardSDK_Version();
    NSLog(@"PKard Version => '%@'", version);
    if(version != nil) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:version];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR];
    }

    // TODO: first check to see if reader and CAC inserted
    [self establishLockSignature];

    [self setEnabled:YES];



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

- (void)lookForIdentities {

}

- (void)lockScreen {
    NSDictionary* identityProof = [[NSUserDefaults standardUserDefaults] valueForKey:@"lockSignature"];
    if(identityProof) {
        TSS_PKI_Signature* signature = [[TSS_PKI_Signature alloc] initWithProperties:identityProof];
        [TSS_PKI_Identity recordScreenUnlockProof:signature];
        [[PKScreenLockController sharedScreenLockController] userWantsLock];
    }
}

- (void) configAlert {
    //A SIMPLE ALERT DIALOG
    UIAlertController *alert =   [UIAlertController
                                  alertControllerWithTitle:@"Smart Card"
                                  message:@"Enter User Credentials"
                                  preferredStyle:UIAlertControllerStyleAlert];


    UIAlertAction *cancelAction = [UIAlertAction
                                   actionWithTitle:NSLocalizedString(@"Cancel", @"Cancel action")
                                   style:UIAlertActionStyleCancel
                                   handler:^(UIAlertAction *action)
                                   {
                                       NSLog(@"Cancel action");
                                   }];

    UIAlertAction *okAction = [UIAlertAction
                               actionWithTitle:NSLocalizedString(@"OK", @"OK action")
                               style:UIAlertActionStyleDefault
                               handler:^(UIAlertAction *action)
                               {
                                   NSLog(@"OK action");
                               }];

    [alert addAction:cancelAction];
    [alert addAction:okAction];

    //dispatch_async(dispatch_get_main_queue(), ^ {
    //    [self presentViewController:alert animated:YES completion:nil];
    //});
}

- (void)updateMessage:(NSString*)inMessage {
    dispatch_async(dispatch_get_main_queue(), ^{
        NSString* newMessage = NSLocalizedString(inMessage, nil);
        if( ![newMessage isEqualToString:_userMessage] ) {
            [self willChangeValueForKey:@"userMessage"];
            _userMessage = newMessage;
            [self didChangeValueForKey:@"userMessage"];
        }
    });
}

- (void)tokenChanged:(NSNotification *)notification {

        // Check if Reader is attached
        if(ReaderStateCurrent() == kReaderStateAttached) {
            NSLog(@"TokenStateCurrent => %d", TokenStateCurrent());

            // Check if CAC is inserted
            if(TokenStateCurrent() == kTokenStateReadyForUse) {
                NSLog(@"Looking for identities ...");
                [self lookForIdentities];
            } else {
                NSLog(@"Please XXX insert your smart card.");
                [self updateMessage:@"Please XXX insert your smart card."];

                [self lockScreen];
            }
        } else {
            NSLog(@"Please XXXX attach your card reader.");
            [self updateMessage:@"Please XXX attach your card reader."];
        }
}

@end
