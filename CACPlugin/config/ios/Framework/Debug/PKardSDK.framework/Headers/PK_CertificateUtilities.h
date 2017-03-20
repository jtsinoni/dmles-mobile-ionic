//
//  PK_CertificateUtilities.h
//  PKardSDK
//
//  Created by Paul Nelson on 12/15/14.
//  Copyright (c) 2014 Thursby Software Systems, Inc. All rights reserved.
//

#ifndef __PK_CertificateUtilities__
#define __PK_CertificateUtilities__
#include <PKardSDK/openssl/x509v3.h>


#ifdef __cplusplus
extern "C" {
#endif
/*
 * PK_CertificateValidationStoreCreate
 * creates an X509_STORE object and configures it using the current trust policy
 */
X509_STORE* PK_CertificateValidationStoreCreate(void);

    
#ifdef __cplusplus
}
#endif

#endif /* __PK_CertificateUtilities__ */
