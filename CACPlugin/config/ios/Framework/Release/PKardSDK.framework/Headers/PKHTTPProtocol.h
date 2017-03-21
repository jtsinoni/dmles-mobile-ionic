//
//  PKHTTPProtocol.h
//  PKWeb
//
//  Created by Randy Boring on 8/24/11.
//  Copyright 2011 Thursby Software Systems, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#include "PKManagedDeployment.h"

extern NSString * const PKSSLAlertErrorDomain;

@class PKHTTPHeaders;
@protocol PKAuthorizationChallengeProtocol;
@class PKHTTPContentEncoding;
@interface PKHTTPProtocol : NSURLProtocol <NSURLAuthenticationChallengeSender> {
    BOOL _abortLoad;
}

@property (nonatomic, assign) int sock;
@property (nonatomic, retain) NSURLRequest *internalRequest;
@property (nonatomic, retain) NSURLRequest *loadingRequest;
@property (nonatomic, retain) NSURLRequest *authenticatingRequest;
@property (nonatomic, retain) NSURLAuthenticationChallenge* authenticatingChallenge;
@property (nonatomic, retain) NSURLProtectionSpace* authenticatingSpace;
@property (nonatomic, retain) NSURLCredential       *usingCredential;
@property (nonatomic, retain) NSURLProtectionSpace  *usingProtectionSpace;
@property (nonatomic, retain) NSURL         *mainDocumentURL;
@property (nonatomic, retain) NSThread* clientThread;
@property (nonatomic, assign) BOOL retried;
@property (nonatomic, retain) NSError *specificError;
@property (nonatomic, assign) BOOL retryConnectionAfterFailure;
@property (nonatomic, assign) BOOL shouldCloseWhenFinished;
@property (nonatomic, assign) NSTimeInterval   timeout;
@property (atomic, assign) BOOL didRespondToClient;
@property (nonatomic, retain) PKHTTPContentEncoding*    contentDecoder;
@property (atomic, assign) BOOL serverCertificateIsValid;
@property (nonatomic, readonly, assign) BOOL isSecureConnection;
@property (nonatomic, assign) BOOL isSecure;
@property (readonly) BOOL isTrusted;
@property (nonatomic, retain) PKPolicy* doNotTrackPolicy;
@property (atomic, assign) NSURLCacheStoragePolicy cacheStoragePolicy;
@property (atomic, assign) uint16_t localPort;
@property (atomic, assign) BOOL debugRequested;

- (BOOL)tellClientDidFailWithError:(NSError*)inError;
- (void)didFinishLoading:(NSURL*)inURL status:(NSInteger)inStatus;

- (NSNumber*)defaultPortNumber;

- (BOOL)connectToHost:(NSString*)hostName port:(NSNumber*)port error:(NSError**)outError;

- (void)closeConnection;

// subclasses may override to clean up
- (void)willRetry;

- (ssize_t)readBuffer:(char*)buff len:(size_t)toRead error:(NSError**)outError;

- (BOOL)do_load_URL;

+ (BOOL)canInitWithRequest:(NSURLRequest *)request;

+ (NSURLRequest *)canonicalRequestForRequest:(NSURLRequest *)request;

+ (BOOL)requestIsCacheEquivalent:(NSURLRequest *)a toRequest:(NSURLRequest *)b;

-(void)setMoreHeaderFieldValues:(CFHTTPMessageRef)myRequest existingHeaders:(NSDictionary*)headerFields;

/*
 * subclasses may override to modify the PKHTTPHeaders object
 * if they want to modify response headers
 */
- (void)updateResponseHeaders:(PKHTTPHeaders*)headers;

+ (NSError *)errorWithEmbeddedError:(NSError*)embErr withDomain:(NSString*)dom code:(NSInteger)code userInfo:(NSDictionary*)uInfo;

+ (id<PKAuthorizationChallengeProtocol>)delegate;
+ (void)setAuthorizationChallengeDelegate:(id<PKAuthorizationChallengeProtocol>)delegate;
- (void)resolveAuthenticationChallenge:(NSURLAuthenticationChallenge*)challenge withCredential:(NSURLCredential*)credential;
- (void)willAuthorizeWithProtectionSpace:(NSURLProtectionSpace*)protectionSpace;

- (void)startLoading;

- (void)stopLoading;

- (void)userCancelled;
- (void)userRequestsRetry;

- (void)enqueue;

/*
 * return error to the NSURL Loading system
 * error will be "normalized" so the domain will be NSURLErrorDomain
 */
- (void)didFailWithError:(NSError*)inError;

// ssl subclass will override this
- (BOOL)writeRequestData:(const unsigned char *)inData length:(NSUInteger)inLength url:(NSURL*)reqURL error:(NSError**)outError;

/*
 * common logging
 */
- (void)logDebug:(const char*)format, ...;
- (void)logProt:(const char*)format, ...;
- (void)logError:(const char*)format, ...;
@end

@protocol PKAuthorizationChallengeProtocol <NSObject>

-(void) URLProtocol:(NSURLProtocol*)protocol willSendRequestForAuthenticationChallenge:(NSURLAuthenticationChallenge*)challenge;

@end
