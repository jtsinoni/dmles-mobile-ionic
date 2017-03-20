//
//  TSS_PKI_SignatureRecord.h
//  PKWeb
//
//  Created by Paul Nelson on 12/12/11.
//  Copyright (c) 2011 Thursby Software Systems, Inc. All rights reserved.
//

#ifndef __TSS_PKI_SignatureRecord__
#define __TSS_PKI_SignatureRecord__
#include <PKardSDK/TSS_PKI.h>

typedef enum {
    kTSSPKISignatureVerifyIdentityNotFound  =-3,
    kTSSPKISignatureVerifyCompareFailure    =-2,
    kTSSPKISignatureVerifySignFailure       =-1,
    kTSSPKISignatureVerifyTryAgain          =0,
    kTSSPKISignatureVerifySuccess           =1,
    kTSSPKISignatureVerifyUserCancelled     =2,
    kTSSPKISignatureVerifySignatureNotSaved =3,
} tss_pki_signature_verify_result_t;

#ifdef __OBJC__

@interface TSS_PKI_Signature : NSObject
@property (retain, nonatomic) NSData*   digest;
@property (retain, nonatomic) NSData*   signature;
@property (retain, nonatomic) NSData*   derEncodedCertificate;
@property (assign, atomic) int signatureType;

- (NSDictionary*)properties;
- (id)initWithProperties:(NSDictionary*)inProperties;
- (tss_pki_signature_verify_result_t)verify;

@end
#endif

#ifdef __cplusplus
extern "C"
{
#endif

    /*
     * record signed data for later verification by TSS_PKI_SignatureVerifyLast
     * Only the last signature is recorded; the previously recorded signature is erased
     *
     * signatureType is the signature algorithm NID (eg: NID_md5_sha1)
     */
    void TSS_PKI_SignatureRecord(const unsigned char * original, size_t orignalLength, 
                                 const unsigned char * signature, size_t signatureLength,
                                 int signatureType,
                                 tss_pki_authorization_handle inAuthorization);
#ifdef __OBJC__
    void TSS_PKI_RecordSignature( TSS_PKI_Signature* inSignature);
    @class TSS_PKI_Identity;
    TSS_PKI_Identity * TSS_PKI_RecordedIdentity();
#endif
    /*
     * TSS_PKI_SignatureRecorded
     * returns 1 if a signature has been recorded, 0 if no signature was recorded
     *
     * When a screen lock operation begins, call this function to see if the screen lock is necessary
     */
    int TSS_PKI_SignatureRecorded(void);
    /*
     * TSS_SSL_VerifyLastSignature
     * verifies the last recorded signature
     */
    tss_pki_signature_verify_result_t TSS_PKI_SignatureVerifyLast(void);
    void TSS_PKI_SignatureResetLast(void);
    
    /*
     * TSS_SignatureRecord_Request marks an RSA object so that when it is used to sign
     * data, the signature is recorded.
     * TSS_SignatureRecord_IsRequested determines if call to TSS_SignatureRecord_Request
     * has been made for a RSA object
     */
    void TSS_SignatureRecord_Request(RSA*);
    int TSS_SignatureRecord_IsRequested(const RSA*);
#ifdef __cplusplus
}
#endif

#endif
