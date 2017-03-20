//
//  NSDictionary+PKPersona.h
//  PKardSDK
//
//  Created by Paul Nelson on 9/15/14.
//  Copyright (c) 2014 Thursby Software Systems, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

/*
 * keys for a PKPersona
 */
// PKPersonaIdentities is an array of TSS_PKI_Identities;
FOUNDATION_EXTERN NSString * const PKPersonaIdentities;
// PKPersonaToken is a string that can be displayed as a title for the persona
FOUNDATION_EXTERN NSString * const PKPersonaTokenTitle;
// PKPersonaTokenUniqueIdentifier is the token unique identifier.  It
// can be used to locate all objects that are on the token that contains
// the persona.  It is only guarranteed to be unique per PKard launch since
// not all cards support a globally unique identifier.
FOUNDATION_EXTERN NSString * const PKPersonaTokenUniqueIdentifier;

@interface NSDictionary (PKPersona)

@property (nonatomic, copy, readonly)   NSArray     *identities;
@property (nonatomic, copy, readonly)   NSString    *tokenTitle;
@property (nonatomic, copy, readonly)   NSString    *tokenUniqueIdentifier;

@end
