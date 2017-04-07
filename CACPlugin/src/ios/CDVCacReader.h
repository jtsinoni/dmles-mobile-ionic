#import <Foundation/Foundation.h>
#import <PKardSDK/TSS_PKI_Identity.h>
typedef enum {
    kUserLoginStateInitializing         = 0,
    kUserLoginStateWaitingForToken,
    kUserLoginStateLookingForCredentials,
    kUserLoginStateReadyToAuthenticate,
    kUserLoginStateAuthenticating,
    kUserLoginStateAuthenticated,
    kUserLoginStateAuthenticateFailed,
} UserAccountState_t;

enum {
    kUserLoginErrorCancelled = 100,
    kUserLoginErrorWrongToken = 101,
};

@class TSS_PKI_Signature;

@interface CDVCacReader : CDVPlugin <PKFIPSModeControllerDelegate, PKScreenLockControllerDelegate> {
    // Member variables go here.
    // Card User Info
    //
}

@property (nonatomic, readonly) TSS_PKI_Identity  *identity;
@property (nonatomic, readonly) NSString          *userMessage;
@property (assign, readonly)    UserAccountState_t state;
@property (nonatomic, readonly) NSString          *emailAddress;
@property (nonatomic, assign) BOOL fipsMode;
- (void)version:(CDVInvokedUrlCommand*)command;
@end
