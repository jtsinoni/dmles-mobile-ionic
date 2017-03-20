//
//  InterAppTransaction.h
//  PKardSDK Test
//
//  Created by Paul Nelson on 2/28/13.
//  Copyright (c) 2013 Paul Nelson. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "PKardBackgroundExecution.h"
#include "TSS_PKI.h"

#define INTERAPP_VERSION  0x212

@class InterAppCommunication;
@class InterAppTransaction;
@protocol InterAppTransactionDelegate <NSObject>
@optional
- (void)InterAppTransaction:(InterAppTransaction*)transaction didFail:(NSError*)error;
- (void)InterAppTransactionDidComplete:(InterAppTransaction*)transaction;

@end

@class InterAppCommunication;
@interface InterAppTransaction : PKardBackgroundExecution <NSCoding>
@property (atomic, assign) NSInteger serialNumber;
@property (atomic, assign) NSInteger version;
@property (atomic, assign) pid_t    processID;
@property (atomic, readonly, assign) BOOL isRequest;
@property (atomic, readonly, assign) BOOL isBroadcast;
@property (atomic, assign) BOOL needsResponse;
@property (nonatomic, retain) NSString* responderScheme;
/*
 * set error to respond to a transaction with an NSError object
 * a convenience method
 * - (void)setErrorCode:(PKardSDKErrorCode_t)inCode withDescription:(NSString*)inDescription;
 * can be used to set this property also
 */
@property (nonatomic, retain) NSError* error;
@property (nonatomic, retain) NSString* openURLWhenComplete;
@property (nonatomic, retain) id <InterAppTransactionDelegate> delegate;
@property (nonatomic, retain) InterAppCommunication* peer;
@property (atomic, assign) NSTimeInterval timeout;
@property (nonatomic) BOOL waiting;   // indicates the caller is waiting on the transaction to complete
/*
 * methods in order of invocation
 */
- (id)init;     // request
/*
 * Initiate sending a request.
 * If peer is nil, send it to the PKard Reader (master)
 * Sub classes should invoke, but not override this method
 * initiateRequest: enqueues the transaction for sending.  The transaction will
 * be retained after initiateRequest: is invoked
 */
- (void)initiateRequest:(InterAppCommunication*)responder;
/*
 * Initiate sending a blocking request.
 * Just like above except will cause the caller to be blocked until
 * the request is completed.
 */
- (void)initiateBlockingRequest:(InterAppCommunication*)responder;
/*
 * Initiate sending a blocking request with a given timeout in seconds
 * Just like above except will cause the caller to be blocked until
 * the request is completed or the timeout expires
 */
- (void)initiateBlockingRequest:(InterAppCommunication*)responder withTimeOutInSeconds:(unsigned long)timeOut;
/*
 * Fail a blocking request
 */
- (void)requestDidFail;
/*
 * When a broadcast operation is needed, invoke
 * broadcast instead of initiateRequest:
 */
- (void)broadcast;
/*
 * encodeRequest is called to serialize information that
 * needs to be sent to the responding app
 * This method should not be called directly
 * This method can be called multiple times if the transaction
 * is being broadcasted.
 */
- (void)encodeRequest:(NSCoder *)aCoder;
/*
 * when a transaction request is received by the responding app
 * initWithCoder is called
 * subclasses must use 
 *  self = [super initWithCoder:aCoder];
 * and should decode properties that were encoded in encodeRequest:
 * This method should not be called directly.
 */
- (id)initWithCoder:(NSCoder *)aDecoder;
/*
 * initiateResponse is called in the responding app
 * any processing should be started here.
 * when the response is ready to send back,
 * the transaction must be enqueued
 * This method should not be called directly.
 */
- (void)initiateResponse:(InterAppCommunication*)connection;
/*
 * encodeResponse is called in the responding app
 * Subclasses must encode any properties that will be returned to the 
 * requesting application here, then call [super initateResponse:]
 * The InterAppTransaction object will be released after this 
 * method is called
 * This method should not be called directly.
 */
- (void)encodeResponse:(NSCoder*)aCoder;
/*
 * decodeResponse is called in the requesting app.
 * Decode any properties that were encoded in the responding app.
 * This method should not be called directly.
 * Subclasses should call [super decodeResponse:] first
 * After this method is called, the transaction will be released.
 */
- (void)decodeResponse:(NSCoder*)aCoder;
/*
 * If a transaction cannot be completed due to an
 * application or connection failure, 
 * didFail: will be invoked and the transaction will be released.
 */
- (void)didFail:(NSError*)inError;

/*
 * Finalize - do not call this method directly!
 * The transaction is about to be released
 * If the transaction is blocking, it should wake up
 */
- (void)finalize;

/*
 * not sure this is used
 */
- (void)openOnResponseUsingScheme:(NSString*)urlScheme;

/*
 * call this method to cause the requesting app to be switched back to the foreground
 * when the response is complete.
 * Sub classes should invoke, but not override this method.
 */
- (void)openOnResponse;

// convenience method for sub classes
// inDescription will be localized
// The error domain will be is TSS_PKI_ERROR_DOMAIN
- (void)setErrorCode:(tss_pki_error_t)inCode withDescription:(NSString*)inDescription;

@end

@interface InterAppState : InterAppTransaction
@end
