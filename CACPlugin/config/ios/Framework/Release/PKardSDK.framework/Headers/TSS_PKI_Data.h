//
//  TSS_PKI_Data.h
//  PKardSDK
//
//  Created by Paul Nelson on 1/18/13.
//  Copyright (c) 2013 Thursby Software Systems, Inc. All rights reserved.
//

#import <PKardSDK/TSS_PKI_Object.h>

@interface TSS_PKI_Data : TSS_PKI_Object
@property (nonatomic, readonly, retain) NSData*   data;
@property (nonatomic, retain) NSString* name;
- (id)initWithName:(NSString*)inName data:(NSData*)inData;
- (NSData*)dataWithBerTlvTag:(uint8_t)inTag;
- (NSData*)cbeffData;   // If the object is in cbeff format

/*
 * construct an appropriate subclass of TSS_PKI_Data 
 */
+(TSS_PKI_Data*)dataObjectWithIdentifier:(tss_pki_identifier_t *)inIdentifier;

+(NSArray*)currentDataObjects;
+(TSS_PKI_Data*)lookupDataObjectWithName:(NSString*)inName;
@end

// Facial image data will be encapsulated in TSS_PKI_FacialImage objects
@interface TSS_PKI_FacialImage : TSS_PKI_Data
@end
