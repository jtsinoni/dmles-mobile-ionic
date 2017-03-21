//
//  PKHTTP.h
//  PKardSDK
//
//  Created by Paul Nelson on 8/23/12.
//  Copyright (c) 2012 Thursby Software Systems, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <PKardSDK/PKHTTPURLRequest.h>

@interface PKHTTP : NSObject <NSURLProtocolClient, PKHTTPURLRequestAuthorizationProtocol>
@property (nonatomic, assign) NSTimeInterval timeout;

// set serverValidation to False to prevent https server certificate validation
@property (atomic, assign) BOOL alwaysAcceptServerCertificate;
@property (atomic, assign) NSDataReadingOptions readOptionsMask;

- (instancetype)initWithURL:(NSURL*)inURL options:(NSDataReadingOptions)readOptionsMask;
- (NSData*)get:(NSError**)outError;

+ (NSData*)contentsOfURL:(NSURL *)url options:(NSDataReadingOptions)readOptionsMask timeout:(NSTimeInterval)inTimeout error:(NSError **)errorPtr;

@end
