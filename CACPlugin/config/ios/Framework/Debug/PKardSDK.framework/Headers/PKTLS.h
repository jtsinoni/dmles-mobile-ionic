//
//  PKSSL.h
//  PKWeb
//
//  Created by RandyAtHome Boring on 7/14/11.
//  Copyright 2011 Thursby Software Systems, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <PKardSDK/openssl/ssl.h>

#import <PKardSDK/openssl/ssl.h>
#import "PKardBIO.h"

// items that must be returned by PKSSL:returnClientX509:returnPKey:
typedef enum {
    // DO NOT return kPKSSLClientAuthWaiting - this is for internal use only
    kPKSSLClientAuthWaiting = -1,       // waiting for a user to choose something for example

    kPKSSLClientAuthNone = 0,           // don't use client auth
    kPKSSLClientAuthReturned = 1,       // client auth values are returned
    kPKSSLClientAuthUseDefault = 2,     // PKSSL should use a default identity
    kPKSSLCLientAuthCancel = 3,         // Cancel the SSL connection
} PKSSLClientAuthResult_t;

/*
 * SSL utility functions
 */
FOUNDATION_EXPORT NSString * const TSS_SSLErrorDomain;
NSError* extract_SSL_Error();

@class PKTLS;
@protocol PKSSL_CallbackDelegate <NSObject>
@optional
/*
 * alertWithLevel may be called when an alert message is received from the server,
 * or it may be called if certificate authentication is requested but no identity could be found.
 * In the latter case, the description will be set to PKARD_NO_USER_CERTIFICATE_FOUND (10001)
 */
-(void)PKSSL:(const PKTLS*)inPKSSL alertWithLevel:(int)level description:(int)description errorCode:(unsigned long)inErrorCode errorString:(NSString *) inErrorString;

/*
 * returnClientX509:returnPKey:
 * This method returns one of the following
 */
- (PKSSLClientAuthResult_t)PKSSL:(const PKTLS*)inPKSSL returnClientX509:(X509**)outCert returnPKey:(EVP_PKEY**)outPKey;
- (int)PKSSL:(const PKTLS*)inPKSSL validateServerWithStore:(X509_STORE_CTX *)store chain:(NSArray*)certChain;
- (void)PKSSL:(const PKTLS*)inPKSSL heartbleed_attack:(int)length;
- (void)PKSSL:(const PKTLS*)inPKSSL infoCallback:(int)info result:(int)error;
@end

@class TSS_PKI_Identity;
@interface PKTLS : NSObject

@property (atomic, assign) SSL* ssl;
/*
 * Setting keepAlive TRUE will request that underlying connections be kept alive
 * Setting keepAlive FALSE will not request that the underlying connection be kept alive.
 * keepAlive defaults to 1
 * You must set this value before calling connectReturningError:
 */
@property (atomic, assign) BOOL   shouldKeepAlive;
/*
 * serverCertIsTrusted is only valid after an attempted connection
 */
@property (readonly) BOOL serverCertIsTrusted;
@property (atomic, assign) BOOL alwaysAcceptServerCertificate;
/*
 * If certificate based authentication was performed, authenticationIdentity
 * will be set to the identity used to authenticate
 */
@property (nonatomic, retain, readonly) TSS_PKI_Identity *authenticationIdentity;
@property (nonatomic, unsafe_unretained) id<PKSSL_CallbackDelegate> delegate;
/*
 * SSL_CTX options are shared by all instances of PKSSL in the cache for a given URL.
 * Setting contextOptions will change the SSL_CTX options for any PKSSL using the same URL.
 * Changes will not affect any PKSSL object that has already connected to a server.
 * Changing contextOptions may be useful if you need to downgrade the TLS version in order
 * to connect to older non-conforming servers.
 */
@property (nonatomic, assign) long  contextOptions;
/*
 * clientVersion returns the version of TLS that the client will negotiate
 */
@property (nonatomic, readonly) int   clientVersion;
/*
 * If PKSSL is connected, serverVersion is the version of TLS/SSL that
 * the connected server supports
 */
@property (nonatomic, readonly) int   serverVersion;
/*
 * localPort is the local TCP port number
 */
@property (nonatomic, readonly) uint16_t    localPort;

/*
 * a copy of the most recent error detected is kept in error
 */
@property (nonatomic, strong) NSError       *error;

- (BOOL)isConnected;
- (BOOL)connectReturningError:(NSError**)outError;

- (BOOL)sslErrorIsRetryable:(int)OpenSSLError error:(NSError**)outError;

/*
 * Call recycle when you are finished using PKSSL
 * If the SSL connecton can be re-used, pass TRUE for canRecycle
 */
- (void)recycle:(BOOL)canRecycle;

/*
 * called by upper layer to indicate how an authorization was performed
 */
- (void)willAuthorizeWithProtectionSpace:(NSURLProtectionSpace*)protectionSpace;

+ (PKTLS*)checkoutForURL:(NSURL*)URL error:(NSError**)outError;
+ (PKTLS*)checkoutForHost:(NSString*)hostName port:(NSNumber *)port error:(NSError**)outError;
/*
 * returns a dictionary containing information about the cache for URL
 * Keys returned:
 *  @"TLSVersionInUse"  - NSNumber with the TLS version
 *  @"TLSLastAlert"     - NSNumber with the alert number
 *  @"TLSAuthIdentity"  - TSS_PKI_Identity used for client auth if any
 *  @"SSL_CTX_Options"  - OpenSSL CTX options
 */
+ (NSDictionary*)cacheInfoForURL:(NSURL*)URL;
+ (void)removeAllCachedSSLs;
+ (void)logCacheState;
+ (void)resetSessionsWithHost:(NSString*)inHost port:(NSInteger)inPort;

@end
