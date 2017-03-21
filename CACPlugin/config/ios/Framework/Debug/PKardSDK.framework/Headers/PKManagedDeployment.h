//
//  PKManagedDeployment.h
//  PKWeb
//
//  Created by Paul Nelson on 5/1/12.
//  Copyright (c) 2012 Thursby Software Systems, Inc. All rights reserved.
//

#ifndef __PKMANAGEDDEPLOYMENT__
#define __PKMANAGEDDEPLOYMENT__

#include <PKardSDK/openssl/ssl.h>
#include <PKardSDK/openssl/err.h>
#include <PKardSDK/openssl/x509v3.h>

#ifdef __cplusplus
extern "C"
{
#endif
    
#define POLICY_NAME_X509POLICY @"X509Policy"
#define POLICY_NAME_OPERATIONALPOLICY @"OperationalPolicy"
#define POLICY_NAME_SITEAUTHENTICATIONDATABASE @"SiteAuthenticationDatabase"
        
    typedef enum {
        kOCSPModeUseNever=0,
        kOCSPModeUseIfSpecified=1,
        kOCSPModeUseResponder=2,
    }tss_ocsp_responder_mode_t;
    
    typedef struct TSS_X509_Policy_rec {
        bool                        perform_revocation_crl_checks;
        bool                        perform_revocation_crl_checks_always;
        bool                        allow_proxy_certs;
        bool                        userMayApproveUnverifiedCerts;
        tss_ocsp_responder_mode_t   ocsp_mode;
        char*                       ocsp_responder;
        unsigned long               revocation_validity_period_allowance;
        unsigned long               revocation_default_maximum_age;
        const unsigned char *       certificate_policies;
    } TSS_X509_Policy_t;
    
    /*
     * policy functions are all thread safe
     */
    /*
     * TSS_X509_PolicyGet
     * Get the current policy for the calling thread
     */
    TSS_X509_Policy_t const * TSS_X509_PolicyGet(void);
    /*
     * TSS_X509_PolicyPut
     * Release policy obtained by TSS_X509_PolicyGet
     * The released policy may be freed
     */
    void TSS_X509_PolicyPut( TSS_X509_Policy_t const **);
    // only allow setting the policy in memory, not in persistent store
    /*
     * TSS_X509_PolicyCopyAndPush
     *  push a mutable copy of the current thread's policy
     *  The caller may modify the returned policy
     *  The resulting policy is only available to the calling thread via TSS_X509_PolicyGet
     *  The last TSS_X509_PolicyPut pops and destroys the policy
     */
    TSS_X509_Policy_t* TSS_X509_PolicyCopyAndPush(void);
    
    /*
     * Host alias support
     * TSS_HostAlias returns the number of characters returned in outAlias
     * or zero if an alias was not found.
     */
    int TSS_HostAlias(const char * inOriginal, char * outAlias, size_t outAliasSize );
    
    /*
     * update certificate validation policy from the cms signed source in the persistent store
     */
    uint8_t PKPolicyManagementCertificateValidation( STACK_OF(X509)* trustedRoots, STACK_OF(X509)*trusted_certificates, STACK_OF(X509)* untrusted_certificates );
    /*
     * See if the certificate validation policy needs to be fetched from the persistent store
     */
    int PKPolicyManagementCertificateValidationNeedsUpdate(void);
    
    int PKPolicyPreferenceValueForKey( const char * key, int *outValue);
    int PKPolicyPolicyValueForKey( const char * key, int *outValue);
    
    bool PKPolicyUseAppleCertificateValidation(void);
#ifdef __cplusplus
}
#endif

#ifdef __OBJC__
/*
 * Load the latest policy management data
 * policyFile may be provided to add policy from a specific file URL, or policyFile may be nil
 * Set flushCache true to reload everything from persistent storage
 */
typedef void (^pkpolicy_callback_t)(NSDictionary*policy, NSError*error);
NSDictionary* PKPolicyManagementLoad(NSURL* inAddPolicyFile, BOOL flushCache);
NSDictionary* PKPolicyManagementLoadWithError(NSURL* inAddPolicyFile, BOOL flushCache, NSError** outError);
void PKPolicyManagementLoadWithCompletion(NSURL* inURL, BOOL flushCache,
                                          pkpolicy_callback_t callback );
NSError* PKPolicyMDMUpdated(NSDictionary* updatedPolicy, BOOL canChangeDefaults);
void PKPolicyMasterSync(void);

void PKValidatePreferenceObject(id prefObject, NSString * key);

@interface PKPolicy : NSObject
@property (readonly, getter=getIsForced) BOOL isForced;
@property (nonatomic, readonly) BOOL isValid;
@property (nonatomic) BOOL isTrue;
@property (assign) BOOL boolValue;
@property (assign) int intValue;
@property (assign) NSInteger integerValue;
@property (assign) NSUInteger unsignedIntegerValue;
@property (assign) double doubleValue;
@property (strong, nonatomic) NSString* stringValue;
@property (strong, nonatomic) NSArray* arrayValue;
@property (strong, readonly, nonatomic) id value;
@property (strong, readonly, nonatomic) NSString* name;
@property (strong, nonatomic) NSDictionary *dictionaryValue;
@property (assign, readonly) NSInteger    priority;

- (void)invalidate; // removes any value.  isValid will return FALSE
/*
 * policyFor and preferenceFor always return a PKPolicy object, creating a new one if necessary
 * lookupExisting will only return an existing policy or nil
 */
+ (PKPolicy*)policyFor:(NSString*)inName;
+ (PKPolicy*)preferenceFor:(NSString*)inName;
+ (PKPolicy*)lookupExisting:(NSString*)inName;
+ (PKPolicy*)setPolicy:(id)inValue forKey:(NSString*)inName isForced:(BOOL)isForced priority:(NSInteger)inPriority;
+ (void)policyHasChanged;   // update policy items with new values
@end

@interface PKPolicySynchronizeState : NSObject
- (void)addPath:(NSString*)path;
- (void)restorePaths;
@end

#endif

#endif /* __PKMANAGEDDEPLOYMENT__ */
