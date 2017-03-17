//
//  PKHTTPURLRequest.h
//  PKardSDK
//
//  Created by Ken Grigsby on 10/15/12.
//  Copyright (c) 2012 Thursby Software Systems, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>


FOUNDATION_EXPORT NSString * const PKExtendedKeyUsageOIDServerAuth;
FOUNDATION_EXPORT NSString * const PKExtendedKeyUsageOIDClientAuth;
FOUNDATION_EXPORT NSString * const PKExtendedKeyUsageOIDCodeSigning;
FOUNDATION_EXPORT NSString * const PKExtendedKeyUsageOIDEmailProtection;
FOUNDATION_EXPORT NSString * const PKExtendedKeyUsageOIDSmartcardLogon;

@class TSS_PKI_Identity;
@interface PKHTTPURLAuthorization : NSObject
typedef enum {
    kPKHTTPURLAuthorizationFail = 0,
    kPKHTTPURLAuthorizationApprove = 1,
    kPKHTTPURLAuthorizationCancel = 2,
    kPKHTTPURLAuthorizationDefault = 3,
} PKHTTPURLAuthorizationResult;

/*
 * certificateChain is an array of TSS_PKI_Certificate objects
 */
@property (retain, nonatomic) NSArray* certificateChain;
@property (retain, nonatomic) NSArray* caNames;
@property (retain, nonatomic) NSError* validationError;
/*
 * delegate should set clientIdentity and return kPKHTTPURLAuthorizationApprove
 * when clientCertificateRequestedWithAuthorization:forRequest: is called to cause a specific identity to be used for authentication
 */
@property (retain, nonatomic) TSS_PKI_Identity* clientIdentity;
- (id)initWithChain:(NSArray*)inChain error:(NSError*)error;
@end

@protocol PKHTTPURLRequestAuthorizationProtocol
@optional
- (PKHTTPURLAuthorizationResult)authorize:(PKHTTPURLAuthorization*)inAuthorization forRequest:(NSURLRequest*)inRequest;
/*
 * clientCertificateRequestedWithAuthorization:forRequest: is called when an HTTPS connection needs
 * a client certificate to use for authentication
 * The list of certificate authorities that the server supports is provided in inAuthorization.caNames, an array of NSStrings
 * If this function returns kPKHTTPURLAuthorizationApprove, it must provide an identity by setting clientIdentity in inAuthorization
 * If this function returns kPKHTTPURLAuthorizationDefault, the normal PKardSDK site lookup and/or user prompting will occur.
 * Returning kPKHTTPURLAuthorizationCancel or kPKHTTPURLAuthorizationDefault cause the HTTPS connection to fail
 */
- (PKHTTPURLAuthorizationResult)clientCertificateRequestedWithAuthorization:(PKHTTPURLAuthorization*)inAuthorization forRequest:(NSURLRequest*)inRequest;
@end

@interface NSURLRequest (PKHTTPURLRequest)

- (NSString*)extendedKeyUsage;
- (id<PKHTTPURLRequestAuthorizationProtocol>)authorizationDelegate;

@end

@interface NSMutableURLRequest (PKMutableHTTPURLRequest)

- (void)setExtendedKeyUsage:(NSString*)value;
- (void)setAuthorizationDelegate:(id<PKHTTPURLRequestAuthorizationProtocol>)delegate;

@end
