//
//  PKPolicyNames.h
//  PKardSDK
//
//  Created by Paul Nelson on 12/2/14.
//  Copyright (c) 2014 Thursby Software Systems, Inc. All rights reserved.
//

#ifndef PKardSDK_PKPolicyNames_h
#define PKardSDK_PKPolicyNames_h

#include <PKardSDK/PKManagedDeployment.h>

// X509 validation policy
FOUNDATION_EXTERN NSString * const PKardSDKPolicyKeyPerformCRLChecks;               // BOOL
FOUNDATION_EXTERN NSString * const PKardSDKPolicyKeyPerformCRLChecksAlways;         // BOOL
FOUNDATION_EXTERN NSString * const PKardSDKPolicyKeyPerformCRLChecksWholeChain;     // BOOL
FOUNDATION_EXTERN NSString * const PKardSDKPolicyKeyPerformOCSPFirstCertOnly;       // BOOL
FOUNDATION_EXTERN NSString * const PKardSDKPolicyKeyAllowProxyCerts;                // BOOL
FOUNDATION_EXTERN NSString * const PKardSDKPolicyKeyOCSPMode;                       // NSNumber - int (0, 1, 2)
FOUNDATION_EXTERN NSString * const PKardSDKPolicyKeyOCSPResponder;                  // NSString
FOUNDATION_EXTERN NSString * const PKardSDKPolicyKeyRevocationValidityPeriodAllowance;                  // NSNumber unsigned long - seconds (default five minutes)
FOUNDATION_EXTERN NSString * const PKardSDKPolicyKeyRevocationDefaultMaximumAge;    // NSNumber unsigned long - seconds (default -1, ignored)

#define PKPOLICY_acceptCookies    [PKPolicy preferenceFor:@"acceptCookies"]
#define PKPOLICY_AuditCertificate    [PKPolicy policyFor:@"AuditCertificate"]
#define PKPOLICY_AuditMaximumSetSize    [PKPolicy policyFor:@"AuditMaximumSetSize"]
#define PKPOLICY_AuditUploadURL    [PKPolicy policyFor:@"AuditUploadURL"]
#define PKPOLICY_ContentSecurityPolicy    [PKPolicy policyFor:@"ContentSecurityPolicy"]

#define PKPOLICY_DiagnosticEmailAddress    [PKPolicy preferenceFor:@"DiagnosticEmailAddress"]
#define PKPOLICY_DiagnosticCallNumber      [PKPolicy preferenceFor:@"DiagnosticCallNumber"]
#define PKPOLICY_DiagnosticsEnabled        [PKPolicy preferenceFor:@"DiagnosticsEnabled"]
#define PKPOLICY_DiagnosticsCollectPersonalContent   [PKPolicy preferenceFor:@"DiagnosticsCollectPersonalContent"]
#define PKPOLICY_DiagnosticInstructions    [PKPolicy preferenceFor:@"DiagnosticInstructions"]
#define PKPOLICY_DiagnosticUploadURL       [PKPolicy preferenceFor:@"DiagnosticUploadURL"]

#define PKPOLICY_DisabledSchemes    [PKPolicy policyFor:@"DisabledSchemes"]
// DisableMailFeatures is a boolean
#define PKPOLICY_DisableEmailFeatures    [PKPolicy preferenceFor:@"DisableEmailFeatures"]
#define PKPOLICY_DoNotTrack    [PKPolicy preferenceFor:@"DoNotTrack"]
#define PKPOLICY_EnabledSchemes    [PKPolicy policyFor:@"EnabledSchemes"]
#define PKPOLICY_enableFIPS140Mode    [PKPolicy preferenceFor:@"enableFIPS140Mode"]
#define PKPOLICY_enableScreenLock    [PKPolicy preferenceFor:@"enableScreenLock"]
// PKardSDKPrefKeyEnableScreenLock is deprecated - you should use the PKPOLICY_enableScreenLock macro
FOUNDATION_EXPORT NSString * const PKardSDKPrefKeyEnableScreenLock;

#define PKPOLICY_externalReaderID    [PKPolicy preferenceFor:@"externalReaderID"]
#define PKPOLICY_HostAliases    [PKPolicy policyFor:@"HostAliases"]
/*
 * HTTPMethodBlacklist is an array of strings containing HTTP methods that should NOT be allowed
 * eg: "PUT", "POST"
 */
#define PKPOLICY_HTTPMethodBlacklist  [PKPolicy preferenceFor:@"HTTPMethodBlacklist"]

#define PKPOLICY_LoggingMaximumLogSize  [PKPolicy preferenceFor:@"LoggingMaximumLogSize"]
/*
 * ManagedApplicationMode policy is an int of type PKManagedApplicationState_t
 */
typedef enum {
    PKManagedApplicationStateInvalid = 0,
    PKManagedApplicationStateNotSupported = 1,
    PKManagedApplicationStateUnmanaged,
    PKManagedApplicationStateManaged,
    PKManagedApplicationStateSwitchingToManaged,
    PKManagedApplicationStateSwitchingToUnmanaged,
} PKManagedApplicationState_t;
#define PKPOLICY_ManagedApplicationMode     [PKPolicy preferenceFor:@"ManagedApplicationMode"]

#define PKPOLICY_networkErrorRate    [PKPolicy preferenceFor:@"networkErrorRate"]
/*
 * OpenInWhiteList
 */
#define PKPOLICY_OpenInWhitelist     [PKPolicy preferenceFor:@"OpenInWhitelist"]

#define PKPOLICY_operationDelay    [PKPolicy preferenceFor:@"operationDelay"]
/*
 * PasteboardMode is an int value of type PKPasteboardPolicy_t
 */
typedef enum {
    PKPasteboardPolicyDisabled = 0,
    PKPasteboardPolicyEnabled = 1,
} PKPasteboardPolicy_t;
#define PKPOLICY_PasteboardMode     [PKPolicy preferenceFor:@"PasteboardMode"]
#define PKPOLICY_preferredIPVersion    [PKPolicy preferenceFor:@"preferredIPVersion"]
/*
 * PrintMode is an int value of type PKPrintPolicy_t
 */
typedef enum {
    PKPrintPolicyDisabled = 0,      // save and clear pasteboard when resign active
    PKPrintPolicyEnabled = 1,       // leave pasteboard alone when resign active
} PKPrintPolicy_t;
#define PKPOLICY_PrintMode     [PKPolicy preferenceFor:@"PrintMode"]

#define PKPOLICY_ProgressViewDelay    [PKPolicy preferenceFor:@"ProgressViewDelay"]
#define PKPOLICY_registerDefaults    [PKPolicy policyFor:@"registerDefaults"]
#define PKPOLICY_screenLockDelay    [PKPolicy preferenceFor:@"screenLockDelay"]
// PKardSDKPrefKeyScreenLockDelayTime is deprecated.  Use PKPolicy_screenLockDelay macro instead
FOUNDATION_EXPORT NSString * const PKardSDKPrefKeyScreenLockDelayTime;
#define PKPOLICY_TLS_VersionNumber    [PKPolicy preferenceFor:@"TLS_VersionNumber"]
#define PKPOLICY_TLS_CipherRule    [PKPolicy preferenceFor:@"TLS_CipherRule"]
// UseAppleHTTP is a boolean
#define PKPOLICY_UseAppleHTTP    [PKPolicy policyFor:@"UseAppleHTTP"]

// UserMayApproveUntrustedServers is a boolean, but is part of the X509 policy
/*
 * VPNConfigurations is an array of dictionaries
 * Each dictionary may have the following keys:
 *  PKardSDKPrefKeyVPNDomain
 *  PKardSDKPrefKeyVPNServer
 *  PKardSDKPrefKeyVPNProxyPort
 *  
 */
FOUNDATION_EXTERN NSString * const		PKardSDKPrefKeyVPNDomain;					// NSString
FOUNDATION_EXTERN NSString * const		PKardSDKPrefKeyVPNServer;					// NSString
FOUNDATION_EXTERN NSString * const		PKardSDKPrefKeyVPNProxyPort;                // NSNumber
#define PKPOLICY_VPNconfigurations    [PKPolicy preferenceFor:@"VPN configurations"]
#endif
