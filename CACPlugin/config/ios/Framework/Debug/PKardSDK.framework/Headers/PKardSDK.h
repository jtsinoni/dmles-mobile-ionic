//
//  PKardSDK.h
//  PKardSDK
//
//  Created by Paul Nelson on 6/5/12.
//  Copyright (c) 2012 Thursby Software Systems, Inc. All rights reserved.
//

#ifndef __PKardSDK__PKardSDK__
#define __PKardSDK__PKardSDK__

#import <Foundation/Foundation.h>
#include <PKardSDK/Logging.h>
#include <PKardSDK/PKardErrors.h>
#include <PKardSDK/PKAccessoryViewController.h>
#include <PKardSDK/PKCMSDecoder.h>
#include <PKardSDK/PKFIPSModeController.h>
#include <PKardSDK/PKHTTP.h>
#include <PKardSDK/PKManagedDeployment.h>
#include <PKardSDK/PKScreenLockController.h>
#include <PKardSDK/PKSmartCardInterface.h>
#include <PKardSDK/PKardBIO.h>
#include <PKardSDK/PKPolicyNames.h>
#include <PKardSDK/TSS_Middleware.h>
#include <PKardSDK/TSS_PKI_Cache.h>
#include <PKardSDK/TSS_PKI_Certificate.h>
#include <PKardSDK/TSS_PKI_Identity.h>
#include <PKardSDK/TSS_PKI_SignatureRecord.h>
#include <PKardSDK/TSS_Site.h>
#include <PKardSDK/TokenState.h>
#include <PKardSDK/UIColor-MoreColors.h>
#ifndef __OBJC__
#include <PKardSDK/PCSC/winscard.h>
#include <PKardSDK/PCSC/wintypes.h>
#endif
#include <PKardSDK/PKCardPresenceView.h>

/*
 * Notifications sent by the SDK
 *
 */
UIKIT_EXTERN NSString *const PKardSDKWillPushViewNotification;
UIKIT_EXTERN NSString *const PKardSDKUserRequestsSecureResetNotification;
UIKIT_EXTERN NSString *const PKardSDKPolicyUpdatedNotification;
/*
 * Notifications that the SDK listens for
 */
/*
 * PKardSDKWillReloadURLNotification
 * Send this notification to clear any cached references to a specific URL
 * The object passed when posting this notification should be an NSURL object
 */
UIKIT_EXTERN NSString *const PKardSDKWillReloadURLNotification;

/*
 * Error and alert strings
 */
FOUNDATION_EXPORT NSString * const PKSSLAlertErrorDomain;
/*
 * certificate error domain and userInfo dictionary keys
 */
FOUNDATION_EXPORT NSString * const PKSSLCertificateValidationErrorDomain;
FOUNDATION_EXPORT NSString * const PKSSLCertificateChainErrorKey;
FOUNDATION_EXPORT NSString * const PKSSLCertificateErrorKey;
FOUNDATION_EXPORT NSString * const PKSSLCertificateErrorNumberErrorKey;
FOUNDATION_EXPORT NSString * const PKSSLCertificateErrorStringErrorKey;
FOUNDATION_EXPORT NSString * const PKSSLCertificateCurrentIssuerErrorKey;
FOUNDATION_EXPORT NSString * const PKSSLCertificateCurrentCertificateErrorKey;
FOUNDATION_EXPORT NSString * const PKardSDKTokenStateChangedNotice;

/*
 * keys for information returned about the attached card reader
 */
FOUNDATION_EXPORT NSString * const SCVendorImageKey;
FOUNDATION_EXPORT NSString * const SCVendorAccessoryKey;
FOUNDATION_EXPORT NSString * const SCVendorStateTextKey;

typedef enum {
    kPKardServiceInitializing = 0,
    kPKardServiceAvailable = 1,
    kPKardServiceUnavailable = 2
} PKardServiceAvailability_t;

#ifdef __OBJC__

@class PKardSDK;
@protocol PKardSDKAppDelegateProtocol<NSObject>
@optional
-(UIViewController*)PKardSDK_GetTopViewController:(PKardSDK*)inSDK;
/*
 * Monitor the status of PKard Reader/Pro
 */
-(void)PKardSDK_ServiceStateChanged:(PKardServiceAvailability_t)isAvailable;
@end

#endif

#ifdef __cplusplus
extern "C" {
#endif

/*
 * Initialize the PKard SDK by calling PKardSDK_Initialize
 */
BOOL PKardSDK_IsInstalled(void);
void PKardSDK_PreInitialize(void);
void PKardSDK_Initialize(BOOL enableFIPSMode);
void PKardSDK_SetNavController(UINavigationController*inController);
void PKardSDK_Finalize(void);
void PKardSDK_ValidationTestMode(void);
void PKardSDK_RegisterHTTPS(void);
void PKardSDK_UnregisterHTTPS(void);
BOOL PKardSDK_TokenIsUnlocked(void);
void PKardSDK_MayDisplayUserInterface(BOOL inMayDisplay);

/*
 * Version functions
 */
NSString* PKardSDK_Version(void);

/*
 * Functions for trusting certificates
 */

void TSS_CertificateValidationAddTrustedCA( X509* trustedRootCertificate );
void TSS_CertificateValidationAddTrustedCert( X509* trustedIntermediateCertificate );
void TSS_CertificateValidationAddUntrustedCA( X509* untrustedRootCertificate );


/*
 * Utility functions
 */
void PKardSDK_Clear_ServerCertificateCache(void);
void PKardSDK_Clear_ServerCertificateCacheForURL(NSURL*);
void PKardSDK_Clear_UserCertificateCache(void);
void PKardSDK_Clear_UserSignatureCache(void);
void PKardSDK_TokenHardwareReset(void);
void PKardSDK_Clear_HTTPSCache(void);
void PKardSDK_Install_SoftCertificate(NSURL* inSource);

/*
 * Reset functions
 * PKardSDK_SecureResetWithNotify performs a reset of many components 
 * It does its work on the main thread, but can be called from any thread
 * if inNotify is true, it will send PKardSDKUserRequestsSecureResetNotification
 * after the reset is completed.
 * Things that are reset:
 *  Caches of server and user certificates
 *  Current TLS/SSL connections are disconnected.
 *  Recorded user signature data is deleted so that screen locking does not.
 *      activate.
 *  The smart card is reset by powering it off, then on again.
 *  The diagnostic log is erased.
 *
 *  If you do not need to be notified when the reset is complete, call
 *  PKardSDK_SecureReset() instead.  This simply calls 
 *      PKardSDK_SecureResetWithNotify(NO)
 */

void PKardSDK_SecureResetWithNotify(BOOL inNotify);
void PKardSDK_SecureReset(void);

/*
 * PKardSDK_OpenSSL_Error
 * create an NSError from the last error reported by openssl libraries
 * If there is a record of the function reporting the error, its name will be included in the error dictionary
 * Use OPENSSL_REPORTING_FUNCTION to locate this name.
 */
#define OPENSSL_REPORTING_FUNCTION @"OPENSSL_REPORTING_FUNCTION"
NSError* PKardSDK_OpenSSL_Error(void);
    
    NSArray *PKardSDK_ExternalAccessoryProtocols(void);
    
#ifdef __cplusplus
}
#endif


#endif /* __PKardSDK__PKardSDK__ */
