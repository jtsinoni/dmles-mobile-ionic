//
//  TSS_Errors.h
//  PKardSDK
//
//  Created by Paul Nelson on 10/24/12.
//  Copyright (c) 2012 Thursby Software Systems, Inc. All rights reserved.
//
#include <PKardSDK/openssl/err.h>

#ifndef PKardSDK_TSS_Errors_h
#define PKardSDK_TSS_Errors_h

#define PKARD_NO_USER_CERTIFICATE_FOUND         10001
#define PKARD_REVOCATION_NO_NETWORK_AVAILABLE   10002
#define PKARD_REVOCATION_SERVERS_UNREACHABLE    10003

// The certificate validation software is attempting to validate a
// server cert but has to fetch a cert from the same server using https:
#define PKARD_CERTIFICATE_FROM_AIA_HTTPS_LOOP   10004

extern int PKard_TSSSC_Library;

#define PKARD_ERR_INDEX(nn) (100+nn)
#define PKARD_F_TSSSC_PUB_ENC                   PKARD_ERR_INDEX(0)
#define PKARD_F_TSSSC_PUB_DEC                   PKARD_ERR_INDEX(1)
#define PKARD_F_TSSSC_PRIV_ENC                  PKARD_ERR_INDEX(2)
#define PKARD_F_TSSSC_PRIV_DEC                  PKARD_ERR_INDEX(3)
#define PKARD_F_TSSSC_FINISH                    PKARD_ERR_INDEX(4)
#define PKARD_F_TSSSC_INIT                      PKARD_ERR_INDEX(5)
#define PKARD_F_TSSSC_SIGN                      PKARD_ERR_INDEX(6)
#define PKARD_F_TSSSC_VERIFY                    PKARD_ERR_INDEX(7)
#define PKARD_F_TSSSC_MOD_EXP                   PKARD_ERR_INDEX(8)
#define PKARD_F_TSSSC_RSA_MOD_EXP               PKARD_ERR_INDEX(9)
#define PKARD_F_RSA_ENCRYPT                     PKARD_ERR_INDEX(10)
#define PKARD_F_TOKEN_UNLOCK                    PKARD_ERR_INDEX(11)
#define PKARD_F_SECURITYCONTEXT                 PKARD_ERR_INDEX(12)
#define PKARD_F_USERCERTIFICATESELECTION        PKARD_ERR_INDEX(13)

#define PKARD_R_CANT_FIND_TOKEN                 PKARD_ERR_INDEX(100)
#define PKARD_R_CANT_FIND_CERTIFICATE           PKARD_ERR_INDEX(101)
#define PKARD_R_CANT_FIND_PRIVATE_KEY           PKARD_ERR_INDEX(102)
#define PKARD_R_CANT_UNLOCK_TOKEN               PKARD_ERR_INDEX(103)
#define PKARD_R_FIPS_SELFTEST_FAILED            PKARD_ERR_INDEX(104)
#define PKARD_R_RSA_KEY_SIZE_TOO_SMALL_FIPS     PKARD_ERR_INDEX(105)
#define PKARD_R_DATA_TOO_LARGE_FOR_KEY_SIZE     PKARD_ERR_INDEX(106)
#define PKARD_R_ASSERTION_FAILURE               PKARD_ERR_INDEX(107)
#define PKARD_R_TOKEN_CRYPTO_FAILURE            PKARD_ERR_INDEX(108)
#define PKARD_R_UNSUPPORTED_PADDING_TYPE        PKARD_ERR_INDEX(109)
#define PKARD_R_PADDING_FAILURE                 PKARD_ERR_INDEX(110)
#define PKARD_R_CANT_USE_PUBLIC_KEY             PKARD_ERR_INDEX(111)
#define PKARD_R_CANT_DECODE_CERTIFICATE         PKARD_ERR_INDEX(112)
#define PKARD_R_TOKEN_UNLOCK_USER_CANCELLED     PKARD_ERR_INDEX(113)
#define PKARD_R_TOKEN_UNLOCK_ATTEMPTS_EXCEEDED  PKARD_ERR_INDEX(114)
#define PKARD_R_TOKEN_UNLOCK_FAILED             PKARD_ERR_INDEX(115)
#define PKARD_R_SECURITY_CONTEXT_INVALID        PKARD_ERR_INDEX(116)
#define PKARD_R_SECURITY_SELF_TEST_FAILED       PKARD_ERR_INDEX(117)
#define PKARD_R_TOKEN_UNLOCK_IN_BACKGROUND      PKARD_ERR_INDEX(118)
#define PKARD_R_X509_SELECT_USER_CANCELLED      PKARD_ERR_INDEX(119)

/*
 * PKard_LoadErrors(void)
 * load error strings table for PKard SDK errors
 */
#ifdef __cplusplus
extern "C"
{
#endif
    
    void PKard_LoadErrors(void);
    
#ifdef __cplusplus
}
#endif

#endif
