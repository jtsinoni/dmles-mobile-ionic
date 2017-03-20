//
//  PKardSDK_SecurityMonitor.h
//  PKardSDK
//
//  Created by Paul Nelson on 2/7/14.
//  Copyright (c) 2014 Thursby Software Systems, Inc. All rights reserved.
//
/*
 * Applications desiring to be notified when security related events
 * occur should create a PKardSDK_SecurityMonitor object and
 * add an observer for the key "ViolationReports"
 * When the value for "ViolationReports" changes, the application
 * should retrieve the set of report dictionaries using the
 * copyAndResetViolationReports method
 */

#import <Foundation/Foundation.h>

#define PK_VIOLATION_REPORTS    @"ViolationReports"
@interface PKardSDK_SecurityMonitor : NSObject
- (NSArray*)copyAndResetViolationReports;
- (void)startMonitoring;
- (void)stopMonitoring;
+ (void)addViolationReport:(NSDictionary*)report;
@end
