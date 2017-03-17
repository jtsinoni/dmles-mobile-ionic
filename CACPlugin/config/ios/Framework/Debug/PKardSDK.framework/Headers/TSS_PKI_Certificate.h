//
//  TSS_PKI_Certificate
//  PKWeb
//
//  Created by Paul Nelson on 7/20/11.
//  Copyright 2011 Thursby Software Systems, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#include <PKardSDK/openssl/x509.h>
#include <PKardSDK/TSS_PKI.h>

FOUNDATION_EXTERN NSString * const X509SubjectAltNameUPN;
FOUNDATION_EXTERN NSString * const X509SubjectAltNameRFC822;
FOUNDATION_EXTERN NSString * const X509SubjectAltNameIPAddress;
FOUNDATION_EXTERN NSString * const X509SubjectAltNameDNS;
FOUNDATION_EXTERN NSString * const X509SubjectAltNameURI;


@interface TSS_PKI_Certificate : NSObject <NSCoding>
{
    X509*   certificate;
}
@property (atomic, assign, readonly) tss_pki_assertions_t assertions;
@property (atomic, assign) BOOL isMiniEncryptionCertificate;

- (TSS_PKI_Certificate*)initWithCertificate:(X509*)certificate;
- (TSS_PKI_Certificate*)initWithData:(const unsigned char *)der length:(NSUInteger)length;
- (TSS_PKI_Certificate*)initWithData:(NSData*)data;

/*
 * create a TSS_PKI_Certificate object from partial certificate data
 * The resulting object will have a temporary X509* (nativeX509) that is
 * unsigned and can be used for key encipherment only
 * These types of certs will have isMiniEncryptionCertificate TRUE and
 * calling validateWIthPurpose will always return 1
 */
-(TSS_PKI_Certificate*)initWithPublicKey:(NSData*)pubKey
                                  issuer:(NSData*)issuerName
                            serialNumber:(NSData*)serialNumber;


/*
 * read a file from a DER or PEM encoded file
 */
+ (TSS_PKI_Certificate*)certificateFromFile:(NSString*)inFilename error:(NSError**)outError;
/*
 * read a list of certificates from a file
 */
+ (NSArray*)certificatesFromFile:(NSString*)inFilename  error:(NSError**)outError;

- (X509*)nativeX509;
- (NSString*)description;

- (NSString*)subjectName;
- (NSString*)subjectNameDN;


- (NSString*)issuerName;
- (NSString*)issuerNameDN;

- (NSDate*)notAfterDate;
- (NSDate*)notBeforeDate;

- (NSData*)serialNumber;
- (NSString*)serialNumberString;

- (NSDictionary*)subjectAltNames;

- (NSData*)derEncoding;

- (BOOL)isEqualToX509_Certificate:(TSS_PKI_Certificate*)inCert;

- (BOOL)hasExtendedKeyUsage:(NSString*)inKeyUsageOID;
- (NSString *)extendedKeyUsageDescription;
- (NSString *)publicKeyUsageDescription;

/*
 * Validate the certificate
 * inChain is an optional array contain additional certificates to use when building the chain
 * trusted is an optional array of trusts to be used.  If trusted is nil, then default system trusts will be used
 * purpose is the X509 purpose eg: X509_PURPOSE_ANY or X509_PURPOSE_SSL_CLIENT
 * if revocation is true, then revocation checks will also be performed
 * If the validation is successful the return value will be X509_V_OK
 * Other return values indicate a validation failure.  For a complete list, see the OpenSSL x509.h header
 * Pass the return value to [TSS_PKI_Certificate validationErrorString:rval] to get a description.
 */
-(int)validateWithChain:(NSArray*)inChain trusted:(NSArray*)inTrustedCerts purpose:(int)inPurpose checkRevocation:(BOOL)checkForRevocation
error:(NSError**)outError;

- (int)validateWithPurpose:(int)inPurpose checkRevocation:(BOOL)checkForRevocation;

+ (NSString*)validationErrorString:(int)validationResult;
@end
