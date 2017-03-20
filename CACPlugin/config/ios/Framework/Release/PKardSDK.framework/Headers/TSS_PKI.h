//
//  TSS_PKI.h
//  PKardSDK
//
//  Created by Paul Nelson on 6/16/12.
//  Copyright (c) 2012 Thursby Software Systems, Inc. All rights reserved.
//

#ifndef __PKARD_SDK__TSS_PKI__
#define __PKARD_SDK__TSS_PKI__
#include <PKardSDK/openssl/x509.h>
#include <stdint.h>

#ifdef __cplusplus
extern "C"
{
#endif


typedef enum {
    kPKISuccess                                 =0,
    kPKIErrorNoMemory                           =1,
    kPKIErrorObjectNotFound                     =2,
    kPKIErrorAuthorizationNotFound              =3,
    kPKIErrorOperationNotSupported              =4,
    kPKIErrorInvalidParamater                   =5,
    kPKIErrorUnlockFailCancelled                =0x10,
    kPKIErrorUnlockFailLockout                  =0x11,
    kPKIErrorUnlockFailCantDisplayUI            =0x12,
    kPKIErrorUnlockFailInvalidReferenceData     =0x13,
    kPKIErrorUnlockFailed                       =0x1f,
    kPKIErrorOpenSSL                            =0x20,
    kPKIErrorNoIdentities                       =0x100,
    kPKIErrorNoObjects                          =0x101,
    kPKIErrorNoReaderApplication                =0x102,
    kPKIErrorTimedOut                           =0x200,
    kPKIErrorAuthenticationRequired             =0x400,
    kPKIErrorHeartbleedExploit                  =0x401,
    kPKIErrorPeerVersionTooOld                  =0x402,
    kPKIErrorGeneric                            =0x10000,
} tss_pki_error_t;

#define TSS_PKI_ERROR_DOMAIN "tss_pki_error_t"

/*
 * assertions about objects, certificates or identities
 */
enum {
    kAssertTokenNone                                = 0,
    kAssertCertificateMatchAny                      = 0x0001,
    kAssertCertificateExtendedUsageClientAuth       = 0x0002,
    kAssertCertificateExtendedUsageEmailProtection  = 0x0004,
    kAssertCertificateExtendedUsageSmartcardLogin   = 0x0008,
    kAssertCertificatePubKeyUsageVerify             = 0x0010,
    kAssertCertificateAltNameRFC822Name             = 0x0020,
    kAssertCertificateAltNameNTPrincipalName        = 0x0040,
    kAssertCertificateKeyUsageDigitalSignature      = 0x0080,
    kAssertCertificateKeyUsageNonRepudiation        = 0x0100,
    kAssertCertificateKeyUsageKeyEncipherment       = 0x0200,
    kAssertCertificateKeyUsageDataEncipherment      = 0x0400,
    kAssertCertificateKeyUsageKeyAgreement          = 0x0800,
    kAssertCertificateEverything                    = 0x8fff,
    kAssertCertificateRetired                       = 0x8000,   // v2.2 or later
    
    kAssertIdentity                                 = 0x1000,
    kAssertTokenDataObject                          = 0x2000,
    kAssertTokenLOA4                                = 0x4000,
    kAssertTokenSmartCard                           = kAssertTokenLOA4,
    kAssertTokenLOA3                                = (kAssertTokenLOA4 << 16),
    kAssertTokenSoft                                = (kAssertTokenLOA4 << 16),
    kAssertTokenAnything                            = 0xffff,
    /*
     * only use kAssertTokenEverything by itself without other values
     * or'd in.  PKardSDK uses equality to check for kAssertTokenEverything
     */
    kAssertTokenEverything                          = 0x10000,
};
typedef unsigned int tss_pki_assertions_t;

#define SITE_CERT_ASSERTION(istrue, isfalse) \
((((isfalse) & 0xffff) << 16) | ((istrue) & 0xffff))
#define SITE_CERT_ASSERT_TRUE(aa) \
(aa & 0xffff)
#define SITE_CERT_ASSERT_FALSE(aa) \
((aa >> 16) & 0xffff)
/*
 * test if tss_pki_assertions_t aa
 * is supported by tss_pki_assertions_t bbb
 */
#define SITE_CERT_ASSERT( aa, bb ) \
(( (SITE_CERT_ASSERT_TRUE(aa) & SITE_CERT_ASSERT_TRUE(bb)) \
== SITE_CERT_ASSERT_TRUE(aa) ) \
&& \
( (SITE_CERT_ASSERT_FALSE(aa) & SITE_CERT_ASSERT_FALSE(bb)) \
== SITE_CERT_ASSERT_FALSE(aa) ) )


typedef uintptr_t    tss_pki_authorization_handle;
typedef int         tss_pki_boolean_t;
#define TSS_PKI_AUTHORIZATION_INITIALIZE ((tss_pki_authorization_handle)0)              // pass this value to tss_pki_authorization_get the first time
#define TSS_PKI_AUTHORIZATION_INVALID ((tss_pki_authorization_handle)0xffffffff)

typedef enum {
    tss_pki_acr_operation_none  = 0,
    tss_pki_acr_operation_read  = 1,
    tss_pki_acr_operation_write = 2,
    tss_pki_acr_operation_crypt = 3,
    tss_pki_acr_operation_max   = 4,
} tss_pki_acr_operation;

typedef enum {
    tss_pki_require_none                = 0,
    tss_pki_require_pin                 = 1,
    tss_pki_require_pin_always          = 2,
    tss_pki_require_global_pin          = 3,
    tss_pki_require_global_pin_always   = 4,
    tss_pki_require_general_auth        = 5,
    tss_pki_require_general_auth_always = 6,
} tss_pki_acr_requirement;

typedef enum {
    tss_pki_cache_with_timeout          =0,
    tss_pki_cache_never                 =1,
} tss_pki_acr_caching;

typedef struct tss_pki_acr_rec
{
    tss_pki_acr_operation   operation;
    tss_pki_acr_requirement requirement;
    tss_pki_acr_caching     cache;
} tss_pki_acr;

typedef struct tss_pki_acrs_rec
{
    int         count;
    tss_pki_acr acr[tss_pki_acr_operation_max];
} tss_pki_acrs_t;


typedef struct tss_pki_identifier_rec
{
    char        key[256];
    char        title[80];
    uint32_t    cycle;
} tss_pki_identifier_t;

int tss_pki_identifier_cmp( const tss_pki_identifier_t* a, const tss_pki_identifier_t* b);

tss_pki_authorization_handle tss_pki_authorization_find(X509 * certificate);

void tss_pki_authorization_invalidate_process(pid_t inProcess);


tss_pki_error_t   tss_pki_authorization_copy_identity( tss_pki_authorization_handle inHandle, X509** outCert, EVP_PKEY**outPKey);
tss_pki_error_t   tss_pki_authorization_copy_contents( tss_pki_authorization_handle inHandle, void** outContent, size_t* outSize);
tss_pki_error_t   tss_pki_authorization_copy_token_unique_identifier( tss_pki_authorization_handle inHandle, void** outContent, size_t* outSize);
    
    void          tss_pki_authorization_log(tss_pki_authorization_handle inHandle);

int tss_pki_authorization_table_empty();
    
#ifdef __cplusplus
}
#endif

#endif /* __PKARD_SDK__TSS_PKI__ */
