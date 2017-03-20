//
//  jws.h
//  
//
//  Created by Michael McEuin on 5/9/2013.
//  Copyright (c) 2013 Thursby Software Systems, Inc. All rights reserved.
//
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#ifdef NOTUSED
#import <Security/SecCertificate.h>
#import <CommonCrypto/CommonDigest.h>
#endif

#import "NSData+Base64.h"

enum {
    kJWSErrorInvalidFileStructure       = 0x01,
    kJWSErrorInvalidHeader              = 0x02,
    kJWSErrorHeaderCertificate          = 0x03,
    kJWSErrorNotSigned                  = 0x04,
    kJWSErrorSignatureNotVerified       = 0x05,
    kJWSErrorSignerCertificateInvalid   = 0x06,
    kJWSErrorInvalidPayload             = 0x07,
};

@interface JWS : NSObject
{
}
@property (nonatomic, strong) TSS_PKI_Certificate* signer;
@property (nonatomic, strong) NSError* error;
@property (nonatomic, strong) NSData* payload;
@property (nonatomic, strong) NSData* content;

- (id)initWithData:(NSData*)inData;
- (id)properties;

// Utility function to verify JWS file, using data,signature and hash
+ (bool) VerifyJwsFile:(NSString *) jwsFileIn contentToData:(NSData ** )contentData saveParts:(bool)saveParts;

// Utility function to encode using base64 (url safe variant)
+ (NSString *) base64urlencode:(NSData *)arg;

// Utility function to decode using base64 (url safe variant)
+ (NSData *) base64urldecode:(NSString *)arg;

// Utility function to Verify signature
+ (bool) Verify:(NSString *)vData withSignature:(NSData *)signatureData  certData:(NSData *) certData algorithm:(NSString*)inAlgorihmName;

// Utility function to save the .pkardmanagement file to the appropriate place
//+(bool) SavePKardManagementDoc:(NSData *)pkmDoc name:(NSString *)name;
+(bool) SavePKardManagementDoc:(NSString *)pkmDoc;

// Utility function to grep data to extract JSON policy data into NSDictionary format
+ (NSDictionary *) GetDictionaryFromData:(NSData *)policyData outError:(NSError**)outError;

// Utility function to get Data of JSON policy file into NSData format
+ (NSData *) DecodeJWSFile:(NSString *)policyFile error:(NSError **)error;

@end

@interface JWSException : NSException

@end

typedef NS_ENUM(NSUInteger, TSSJwsError)
{
    TSSJwsErrSucceed,
    TSSJwsErrFailedToVerify
};

