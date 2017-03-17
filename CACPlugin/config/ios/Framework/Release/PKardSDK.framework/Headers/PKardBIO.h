//
//  PKardBIO.h
//  PKWeb
//
//  Created by Paul Nelson on 4/20/12.
//  Copyright (c) 2012 Thursby Software Systems, Inc. All rights reserved.
//
#include <PKardSDK/openssl/bio.h>
#import <Foundation/Foundation.h>

@protocol PKardBIONotificationDelegate;
@interface PKardBIO : NSObject
{
    @protected
    BOOL        _isConnected;
}

@property (nonatomic, strong) NSString* host;
@property (nonatomic, strong) NSString* originalhost;
@property (atomic, assign)    int port;
@property (atomic, assign)    int localPort;

@property (readonly, assign) BIO* rbio;
@property (readonly, assign) BIO* wbio;

@property (nonatomic, strong) NSError* error;

@property (nonatomic, retain) id<PKardBIONotificationDelegate> notificationDelegate;
/*
 * Setting keepAlive TRUE will request that underlying connections be kept alive
 * Setting keepAlive FALSE will not request that the underlying connection be kept alive.
 * keepAlive defaults to 1
 * You must set this value before calling connectReturningError:
 */
@property (atomic, assign) BOOL   shouldKeepAlive;

/*
 * override to initialize.  Don't count on init
 */
- (void)initialize;                                             // optional
- (BIO*)connectBIO;                                             // required
- (int)bio_bread:(char*)outBuf maxlength:(int)inMaxLength;      // required
- (int)bio_bwrite:(const char *)inBuf length:(int)inLength;     // required
- (int)bio_bputs:(const char *)inStr;                           // optional
- (int)bio_bgets:(char*)outBuf maxlen:(int)inMaxlen;            // optional, base class throws exception
- (long)bio_ctrl:(int)inCmd value:(long)inValue arg:(void*)inOutArg;    // optional
- (long)bio_callback:(int)what info:(bio_info_cb*)info;         // optional
- (BOOL)canConnectToHost:(NSString*)inHost port:(int)inPort;    // required

typedef enum {
    kBIOIdle            = 0,
    kBIOReadAvailable   = 1,
    kBIOCanWrite        = 2,
    kBIOEndpointInvalid = 4,
} PKardBIO_Status_t;

- (PKardBIO_Status_t)status;                                          // required
- (void)shutdown;
- (BOOL)reconnect;
- (void)invalidate;

- (BOOL)isConnected;

/*
 * Do NOT override makeBIO.  Use it to get a BIO* when needed
 */
- (BIO*)makeBIO;
/*
 * register other BIO providers
 * Providers are asked if it can connect to a host and port starting with the most recently registered
 * inClass must be a subclass of PKardBIO
 */
+ (void)registerProvider:(Class)inClass;
/*
 * universal constructor
 */
+(PKardBIO*)pkardBIOWithHost:(NSString*)inHost port:(int)inPort;

@end

@protocol PKardBIONotificationDelegate <NSObject>

- (void)PKardBIO_CanRead:(PKardBIO*)bio;

@end
