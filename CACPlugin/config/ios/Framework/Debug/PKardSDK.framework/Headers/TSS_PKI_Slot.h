//
//  TSS_PKI_Slot.h
//  PKardSDK
//
//  Created by Paul Nelson on 1/27/14.
//  Copyright (c) 2014 Thursby Software Systems, Inc. All rights reserved.
//
#ifndef __TSS_PKI_SLOT__
#define __TSS_PKI_SLOT__

#import <Foundation/Foundation.h>
@class UINavigationController;
/*
 * keys for the info property may include:
 */
FOUNDATION_EXPORT NSString * const PKISlotImageKey;
FOUNDATION_EXPORT NSString * const PKISlotNameKey;
FOUNDATION_EXPORT NSString * const PKISlotManufacturerKey;
FOUNDATION_EXPORT NSString * const PKISlotModelNumberKey;
FOUNDATION_EXPORT NSString * const PKISlotSerialNumberKey;
FOUNDATION_EXPORT NSString * const PKISlotFirmwareRevisionKey;
FOUNDATION_EXPORT NSString * const PKISlotHardwareRevisionKey;
FOUNDATION_EXPORT NSString * const PKISlotVendorStateKey;
FOUNDATION_EXPORT NSString * const PKISlotExternalAccessoryKey;

FOUNDATION_EXPORT NSString * const TSS_PKI_ReaderDidConnect;
FOUNDATION_EXPORT NSString * const TSS_PKI_ReaderDidDisconnect;


@interface TSS_PKI_Slot : NSObject
@property (nonatomic, readonly) NSString* name;
@property (nonatomic, readonly) NSDictionary* info;
/*
 * identities is an array of TSS_PKI_Identity objects
 * associated with the token
 */
@property (nonatomic, readonly) NSArray* identities;
@property (nonatomic, readonly) NSArray* objects;

- (id)initWithName:(NSString*)inName;

@end

@interface TSS_PKI_Reader : NSObject
@property (nonatomic, retain) NSString* name;
@property (nonatomic, retain) NSDictionary* info;

- (id)initWithName:(NSString*)inName;
- (void)pushUserView:(UINavigationController*)parentNavigationController;
- (NSArray*)currentObjects;
- (BOOL)isAvailable;

+ (NSArray*)currentReaders;

@end



#endif /* __TSS_PKI_SLOT__ */
