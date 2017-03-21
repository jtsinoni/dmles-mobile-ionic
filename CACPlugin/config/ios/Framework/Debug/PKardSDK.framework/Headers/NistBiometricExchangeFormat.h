//
//  NistBiometricExchangeFormat.h
//  PKardSDK
//
//  Created by Paul Nelson on 1/20/13.
//  Copyright (c) 2013 Thursby Software Systems, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NistBiometricExchangeFormat : NSObject
@property (nonatomic, readonly, retain) NSData* jpeg;
@property (nonatomic, readonly, retain) NSError* error;

/*
 * init with Common Biometric Exchange Format Framework data
 */
- (id)initWithCBEFFData:(NSData*)cbeffData;
/*
 * validate the signature
 * returns true if signature is valid, false if the signature is invalid or the certificate change cant be validated.
 * Returns an array of NSString objects containing the signing certificate subject names.
 * subject names may be returned even if validateSignatureReturningSignerSubjectNames returns FALSE.
 *
 * If the signature cannot be validated, the error property will be set.
 */
- (BOOL)validateSignatureReturningSignerSubjectNames:(NSArray**)outSignerSubjectNames;
/*
 * return an array containing the signer certificates located by validateSignatureReturningSignerSubjectNames if available
 * Each signer object is a TSS_PKI_Certificate
 */
- (NSArray*)signers;
@end
