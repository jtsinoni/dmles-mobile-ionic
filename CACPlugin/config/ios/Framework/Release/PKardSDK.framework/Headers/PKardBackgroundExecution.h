//
//  PKardBackgroundExecution.h
//  PKardSDK
//
//  Created by Paul Nelson on 8/4/14.
//  Copyright (c) 2014 Thursby Software Systems, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@class PKardBackgroundExecution;


@interface PKardBackgroundExecution : NSObject

/*
 * call to see if background execution can take place
 */
- (BOOL)backgroundTaskIsActive;
/*
 * call to begin background execution
 */
- (void)beginBackgroundExecution;

/*
 * override in subclasses -
 */
- (void)PKardBackgroundExecutionWillExpire;

/*
 * call to end background execution if task finishes before
 * PKardBackgroundExecutionWillExpire is called
 */
- (void)endBackgroundExecution;
@end
