#import <Foundation/Foundation.h>
#import <PKardSDK/TSS_PKI_Identity.h>

@class TSS_PKI_Signature;

@interface CDVCacReader : CDVPlugin {
    // Member variables go here.
    // Card User Info
    //
}

@property (nonatomic, readonly) TSS_PKI_Identity  *identity;
@property (nonatomic, readonly) NSString          *userMessage;
- (void)version:(CDVInvokedUrlCommand*)command;
@end
