//
//  PKSmartCardInterface.h
//  PKWeb
//
//  Created by Ken Grigsby on 10/19/11.
//  Copyright (c) 2011 Thursby Software Systems, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

FOUNDATION_EXPORT NSString * const PKSmartCardInsertedNotification;
FOUNDATION_EXPORT NSString * const PKSmartCardRemovedNotification;

FOUNDATION_EXPORT NSString * const PKSmartCardDidLockNotification;
FOUNDATION_EXPORT NSString * const PKSmartCardDidUnlockNotification;
FOUNDATION_EXPORT NSString * const PKSmartCardUnlockDidFailNotification;

@protocol PKSmartCardInterface <NSObject>

@required

- (NSArray*)identities;
@end
