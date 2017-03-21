//
//  PKCMSDecoder.h
//  PKWeb
//
//  Created by Paul Nelson on 3/21/12.
//  Copyright (c) 2012 Thursby Software Systems, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <PKardSDK/openssl/x509.h>

FOUNDATION_EXPORT NSString * const CMSDecoderErrorDomain;
FOUNDATION_EXPORT NSString * const OpenSSLErrorDomain;

NSData* PKCMSDecode( NSData* cmsderencoded, NSError** outError );


// TSS_VerifyMailSignature return content of messageMime if verification succeeds
NSData* TSS_VerifyMailSignature(NSData *messageMime, NSError **outError);

NSData* TSS_SignMailData(NSData* messageMime, EVP_PKEY *pkey, X509 *signcert, STACK_OF(X509) *certs, NSError ** outError);

NSData* TSS_DecryptMailMessage(NSData *messageMime, EVP_PKEY *pkey, X509 *cert, NSError **outError);

NSData * TSS_EncryptMailData(NSData* messageMime, STACK_OF(X509) *certs, const EVP_CIPHER *cipher, NSError ** outError);

NSArray *TSS_CertificatesFromMailMessage(NSData *messageMime); // returns array of TSS_PKI_Certificates
