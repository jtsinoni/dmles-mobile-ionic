//
//  TSS_PKI_Identity.h
//  PKWeb
//
//  Created by Paul Nelson on 8/6/11.
//  Copyright 2011 Thursby Software Systems, Inc. All rights reserved.
//

#import <PKardSDK/TSS_PKI_Object.h>
#import <PKardSDK/TSS_PKI_Certificate.h>
#import <PKardSDK/TSS_Site.h>
#import <PKardSDK/TSS_PKI_SignatureRecord.h>


/*
 * Instances of this class keep track of a triple identifying a certificate that could be
 * chosen by a user
 * Since a smartcard provider may know that a cert is present, but not have the actual cert in memory, the 
 * certificate is optional.
 */

@interface TSS_PKI_Identity : TSS_PKI_Object <NSCoding>

@property (nonatomic, retain) NSConditionLock *threadLock;
@property (nonatomic, retain) TSS_PKI_Certificate *certificate;
/*
 * You should not access the certificate property from the main thread
 * because it may force a certificate to be fetched from a token and could
 * cause a deadlock.
 *
 * Instead, access the certificateMainThread property.
 * If the certificate has already been fetched, it will be returned.
 * Otherwise certificateMainThread will be nil.
 */
@property (atomic, assign, readonly) TSS_PKI_Certificate *certificateMainThread;
/*
 * The certificateID may not be supported in future versions.
 * Please use the 'key' or 'title' property instead.
 */
@property (nonatomic, assign, readonly) const char *certificateID;
@property (atomic, assign, readwrite) tss_pki_assertions_t certificateAssertions;

-(BOOL)copyCertificate:(X509**)outCertificate privateKey:(EVP_PKEY**)outPKey;
-(BOOL)login:(NSString*)passcode error:(NSError**)outError;
-(void)logout;

+(NSArray*)currentIdentitiesWithAssertion:(tss_pki_assertions_t)inAssertion;
+(NSArray*)currentIdentities;
+(NSArray*)currentIdentitiesWithExtendedKeyUsage:(NSString*)inKeyUsageOID;
+(NSArray*)currentIdentitiesWithTokenName:(NSString*)inTokenName;
+ (TSS_PKI_Identity*)identityWithName:(NSString*)inName;

/*
 * recordIdentityProof will create a dictionary containing data that will be
 * used at a later time to prove that an available identity matches
 * If optionalIdentity is nil, the first available identity will be used.
 */
+(TSS_PKI_Signature*)identityProofRecord:(TSS_PKI_Identity*)optionalIdentity;
/*
 * recordScreenLockProof
 * Record an identity proof so that it will be used to validate screen unlock
 */
+(void)recordScreenUnlockProof:(TSS_PKI_Signature*)identityProofRecord;
/*
 * lookupAndVerifyIdentityProofRecord
 * used to locate an available identity that matches the identity proof record
 * then makes the identity cryptographically prove it matches.
 */
+(BOOL)lookupAndVerifyIdentityProofRecord:(TSS_PKI_Signature*)identityProofRecord;

@end
