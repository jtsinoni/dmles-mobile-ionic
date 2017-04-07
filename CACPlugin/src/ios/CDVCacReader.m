#import <Cordova/CDV.h>
#include <PKardSDK/PKardSDK.h>
#include <PKardSDK/TokenState.h>
#import <PKardSDK/Logging.h>
#import "CDVCacReader.h"


@interface CDVCacReader ()
{
    id  tokenObserver;
}
@property (nonatomic, strong) TSS_PKI_Signature *challengeData;

- (void)tokenChanged:(NSNotification*)notification;
- (void)establishLockSignature;
@end

@implementation CDVCacReader

@synthesize state = _state;
@synthesize challengeData;
@synthesize identity = _identity;
@synthesize userMessage = _userMessage;
@synthesize emailAddress;
@synthesize fipsMode;


- (id)init
{
    self = [super init];
    if(self) {
        _state = kUserLoginStateInitializing;

        // get properties from NSUserDefaults
        id userAccount = [[NSUserDefaults standardUserDefaults]
                          objectForKey:@"UserAccount"];
        if( userAccount )
        {
            id accountObject = [NSKeyedUnarchiver unarchiveObjectWithData:userAccount];
            if( accountObject != nil
               && [accountObject isKindOfClass:[TSS_PKI_Signature class]] )
                self.challengeData = (TSS_PKI_Signature*)accountObject;
        }

        // configure defaults for ScreenLock behavior  (probably in your app's delegate)
        if(!PKPOLICY_enableScreenLock.isValid)
            PKPOLICY_enableScreenLock.boolValue = YES;
        if(!PKPOLICY_screenLockDelay.isValid)
            PKPOLICY_screenLockDelay.doubleValue = 5.0;

        //[self setEnabled:YES];
    }
    return self;
}

- (void)FIPSModeController:(PKFIPSModeController*)controller didFinishWithSuccess:(BOOL)success andState:(BOOL)enabled {
    LogDebug("FIPS Mode set: %d", enabled);
    self.fipsMode = enabled;
}

- (void)dealloc {
    self.challengeData = nil;
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
        _state = kUserLoginStateInitializing;
    }
}

// String to describe this object
- (NSString*)description
{
    return [NSString stringWithFormat:@"UserAccount: Email - %@",
            self.emailAddress];
}

#pragma mark - UserAccount Properties

- (TSS_PKI_Certificate*)challengeCertificate
{
    TSS_PKI_Certificate* rval=nil;
    if( self.identity )
        rval = self.identity.certificate;
    else if( self.challengeData && self.challengeData.derEncodedCertificate )
        rval = [[TSS_PKI_Certificate alloc]
                initWithData:challengeData.derEncodedCertificate];
    return rval;
}

- (NSString*)emailAddress
{
    TSS_PKI_Certificate* userCert = [self challengeCertificate];

    emailAddress = [[userCert subjectAltNames]
                    objectForKey:X509SubjectAltNameRFC822];
    return emailAddress;
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





    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

}

- (void)pluginInitialize {
    if (PKardSDK_IsInstalled()) {
        PKardSDK_Initialize(NO);

        // log all debug messages (7)
        TSSLogLevelSet(7);

        PKardSDK_RegisterHTTPS();

        // Allows PKard SDK to put up user interface dialogs or views such as the PIN entry view
        //PKardSDK_MayDisplayUserInterface(YES);

        // TODO: first check to see if reader and CAC inserted
        //[self establishLockSignature];

        // Set delegate so the user can be prompted to delete files (reset)
        // and reeive error callback
        [PKScreenLockController sharedScreenLockController].delegate = self;


        #ifdef USE_FIPS_MODE
        BOOL isOn = YES;
        PKFIPSModeController* FIPSModeController = [[[PKFIPSModeController alloc] init] autorelease];
        FIPSModeController.delegate = self;
        [FIPSModeController setMode: isOn ? PKFIPSModeEnable : PKFIPSModeDisable];
        #endif

        [self setEnabled:YES];


    } else {
        // Show alert in cordova that the  "PKard Reader not installed"
    }
}


- (void)lockScreen {
    NSDictionary* identityProof = [[NSUserDefaults standardUserDefaults] valueForKey:@"lockSignature"];
    if(identityProof) {
        TSS_PKI_Signature* signature = [[TSS_PKI_Signature alloc] initWithProperties:identityProof];
        [TSS_PKI_Identity recordScreenUnlockProof:signature];
        [[PKScreenLockController sharedScreenLockController] userWantsLock];
    }
}

- (void) showAlert:(NSString *)message {
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"PKard Alert" message:message preferredStyle:UIAlertControllerStyleAlert];

    id rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;
    if([rootViewController isKindOfClass:[UINavigationController class]])
    {
        rootViewController = ((UINavigationController *)rootViewController).viewControllers.firstObject;
    }
    if([rootViewController isKindOfClass:[UITabBarController class]])
    {
        rootViewController = ((UITabBarController *)rootViewController).selectedViewController;
    }

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

    [alertController addAction:cancelAction];
    [alertController addAction:okAction];


    dispatch_async(dispatch_get_main_queue(), ^ {
        [rootViewController presentViewController:alertController animated:YES completion:nil];
    });
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

- (void)nextState:(UserAccountState_t)newState
{
    [self willChangeValueForKey:@"state"];
    _state = newState;
    [self didChangeValueForKey:@"state"];
}

#pragma mark - Handle user login

- (NSError*)makeError
{
    NSError* rval;
    if( ERR_peek_last_error() != 0 )
        rval = PKardSDK_OpenSSL_Error();
    else
    {
        NSDictionary* userInfo =
        [NSDictionary dictionaryWithObject: NSLocalizedString(@"User cancelled.", nil)
                                    forKey:NSLocalizedDescriptionKey];
        rval = [NSError errorWithDomain:@"UserAccount"
                                   code:kUserLoginErrorCancelled
                               userInfo:userInfo];
    }
    return rval;
}

- (void)startLogin
{
    if( _state == kUserLoginStateReadyToAuthenticate
       || _state == kUserLoginStateAuthenticateFailed )
    {
        [self nextState:kUserLoginStateAuthenticating];
        dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
            NSError* loginFailed = nil;
            if( !self.challengeData )
            {
                /*
                 * Logging in when no previous user identity was saved
                 * In this case we create a new TSS_PKI_Signature
                 * using the identity we found earlier
                 */
                self.challengeData = [TSS_PKI_Identity identityProofRecord:_identity];
                if( !self.challengeData )
                {
                    _identity = nil;        // forget the identity
                    loginFailed = [self makeError];
                }
            }
            else
            {
                /*
                 * Logging in by verifying the user identity is the same
                 * as a previous login
                 * In this case we verify that the user can sign the
                 * original challenge data and that the signature
                 * matches the one on file
                 */
                if( ! [TSS_PKI_Identity lookupAndVerifyIdentityProofRecord:
                       self.challengeData] )
                    loginFailed = [self makeError];
            }
            if( loginFailed )
            {
                [self nextState:kUserLoginStateAuthenticateFailed];
                [self updateMessage:@"Please re-insert your card."];
                /*
                if( [self.delegate conformsToProtocol:
                     @protocol(UserAccountDelegateProtocol)] )
                    dispatch_async(dispatch_get_main_queue(), ^{
                        [self.delegate UserAccount:self loginFailed:loginFailed];
                    });
                 */
            }
            else
            {
                [[PKScreenLockController sharedScreenLockController]
                 registerForSmartCardNotifications];
                [self nextState:kUserLoginStateAuthenticated];
                [self updateMessage:@"Authenticated."];
                // activate screen lock
                [TSS_PKI_Identity recordScreenUnlockProof:self.challengeData];
                [self saveUserChallenge];
                /*
                if( [self.delegate conformsToProtocol:
                     @protocol(UserAccountDelegateProtocol)] )
                    dispatch_async(dispatch_get_main_queue(), ^{
                        [self.delegate UserAccountLoginComplete:self];
                    });
                 */
            }
        });
    }
}

- (void)saveUserChallenge
{
    if( (_state == kUserLoginStateAuthenticated) && self.challengeData )
    {
        [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"UserAccount"];
        id accountObject = [NSKeyedArchiver
                            archivedDataWithRootObject:self.challengeData];
        if( accountObject )
            [[NSUserDefaults standardUserDefaults] setObject:accountObject
                                                      forKey:@"UserAccount"];
    }
}

- (void)removeUserChallenge
{
    id userAccount = [[NSUserDefaults standardUserDefaults]
                      objectForKey:@"UserAccount"];
    if( userAccount )
        [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"UserAccount"];
}


#pragma mark - Monitor smart card / tokens

- (void)identityDoesNotMatchOriginal
{
    NSString* errorMessage = NSLocalizedString(
                                               @"The current card does not match the user account.\n"
                                               "Please insert the card previously used to log in.", nil);
    [self updateMessage:errorMessage];
    [self nextState:kUserLoginStateAuthenticateFailed];
    /*
    if( [self.delegate conformsToProtocol:
         @protocol(UserAccountDelegateProtocol)] )
        dispatch_async(dispatch_get_main_queue(), ^{
            NSDictionary* userInfo = [NSDictionary dictionaryWithObject:errorMessage
                                                                 forKey:NSLocalizedDescriptionKey];
            NSError *error = [NSError errorWithDomain:@"UserAccount"
                                                 code:kUserLoginErrorWrongToken
                                             userInfo:userInfo];
            [self.delegate UserAccount:self loginFailed:error];
        });
     */
}

- (void)lookForIdentities
{
    [self nextState:kUserLoginStateLookingForCredentials];
    [self updateMessage:@"Looking for credentials…"];
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_BACKGROUND, 0), ^{
        /*
         * We only look for identities that can do digital signatures
         * since we use digital signatures to sign our challenge data.
         * We prefer an identity with an email address so look for those first
         */
        NSArray * identities = [TSS_PKI_Identity currentIdentitiesWithAssertion:kAssertCertificateExtendedUsageSmartcardLogin];
        if( identities.count == 0 )
            identities = [TSS_PKI_Identity currentIdentitiesWithAssertion:kAssertCertificateKeyUsageDigitalSignature];

        if( identities.count > 0 )
        {
            // Find the first email address from the identities
            // Look for an email address in identities
            TSS_PKI_Certificate* challengeCert = [self challengeCertificate];
            if( challengeCert )
            {
                for (_identity in identities)
                {
                    if( challengeCert )
                    {
                        if( [challengeCert isEqual:_identity.certificate] )
                            break;
                    }
                }
                if( !_identity )
                    [self identityDoesNotMatchOriginal];
            }
            else
                _identity = identities[0];
        }
        if( _identity )
        {
            [self nextState:kUserLoginStateReadyToAuthenticate];
            [self updateMessage:@"Ready to log in."];
            [self startLogin];
            /*
            if( [self.delegate conformsToProtocol:
                 @protocol(UserAccountDelegateProtocol)] )
                [self.delegate UserAccountReadyForLogin:self];
             */
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
                //[self showAlert:@"Looking for identities ..."];
                [self lookForIdentities];
                //[self establishLockSignature];
            } else {
                NSLog(@"Please insert your smart card.");
                //[self showAlert:@"Please insert your smart card"];

                /*
                NSDictionary* identityProof = [[NSUserDefaults standardUserDefaults] valueForKey:@"lockSignature"];
                if(identityProof) {
                    [self lockScreen];
                } else {
                    [self showAlert:@"Please insert your smart card."];
                }
                 */
                //[self updateMessage:@"Please insert your smart card."];
                //[self lockScreen];
            }
        } else {
            //[self showAlert:@"Please attach your card reader."];
            NSLog(@"Please attach your card reader.");
            //[self updateMessage:@"Please attach your card reader."];
        }
}

@end
