//
//  PKHTTPResponseFilter.h
//  PKardSDK
//
//  Created by Paul Nelson on 2/3/14.
//  Copyright (c) 2014 Thursby Software Systems, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@class PKHTTPResponseFilter;
@protocol PKHTTPResponseFilterDelegate <NSObject>
@optional;
- (NSError*)PKHTTPResponseFilter:(PKHTTPResponseFilter*)filter errorForRequest:(NSURLRequest*)inRequest response:(NSHTTPURLResponse*)inResponse;

@end

@interface PKHTTPResponseFilter : NSObject
@property (nonatomic, strong) id <PKHTTPResponseFilterDelegate> delegate;

- (void)registerFilter;
- (void)unregisterFilter;

/*
 * subclasses should inspect the request and response to see
 * if they want to handle them.
 * The default implementation will return YES if a delegate is
 * specified
 */
- (BOOL)canHandleRequest:(NSURLRequest*)inRequest response:(NSHTTPURLResponse*)inResponse;

/*
 * subclass should return nil if the response should be processed
 * normally.  Otherwise, an error should be returned that will be
 * passed up through NSURLConnection to the request issuer
 */
- (NSError*)shouldFailRequest:(NSURLRequest *)inRequest response:(NSHTTPURLResponse *)inResponse;

+ (PKHTTPResponseFilter*)lookupFilterRequest:(NSURLRequest*)inRequest response:(NSHTTPURLResponse*)inResponse;
@end
