//
//  PKAuditTrail.h
//  PKardSDK
//
//  Created by Paul Nelson on 12/20/13.
//  Copyright (c) 2013 Thursby Software Systems, Inc. All rights reserved.
//
#ifndef PKardSDK_PKAuditTrail_h
#define PKardSDK_PKAuditTrail_h

typedef enum {
    AUDIT_SEVERITY_CRITICAL     =1,
    AUDIT_SEVERITY_ERROR        =2,
    AUDIT_SEVERITY_WARNING      =3,
    AUDIT_SEVERITY_SECURITY     =4,
    AUDIT_SEVERITY_INFORMATION  =5,
} pkaudit_severity_t;

#if __OBJC__
#include <Foundation/Foundation.h>
#endif

#ifdef __cplusplus
extern "C" {
#endif
    
    /*
     * Call PKardAuditConfigure if the audit policy changes
     * Auditing will automatically configure when PKard SDK initializes.
     */
    void PKAuditConfigure(void);
    
    typedef enum
    {
        kAuditTypeNone,
        kAuditTypeSigned,
        kAuditTypeUnsigned,
        kAuditTypeString,
        kAuditTypeData,
    } audit_parameter_type;
    typedef struct
    {
        audit_parameter_type kind;
        const char *        key;
        size_t              length;
        union {
            long            Signed;
            unsigned long   Unsigned;
            const char *    String;
            void*           Data;
        } value;
    } audit_parameters_t;
#define AUDIT_UNSIGNED(key, uval) {kAuditTypeUnsigned, key, 0, {.Unsigned=uval}}
#define AUDIT_SIGNED(key, sval) {kAuditTypeSigned, key, 0, {.Signed=sval}}
#define AUDIT_STRING(key, string) {kAuditTypeString, key, 0, {.String=string}}
#define AUDIT_DATA(key, data, length) {kAuditTypeData, key, length, {.Data=data}}
#define AUDIT_PARAM_END {kAuditTypeNone, 0, 0, {0}}
    /*
     * PKAuditEnabled returns 1 if enabled, 0 if not enabled
     */
    int PKAuditIsEnabled(void);

    void PKAudit( pkaudit_severity_t severity, const char* name,
                 const char* format, ...);
    void PKAuditWithParameters( pkaudit_severity_t severity, const char* name,
                               audit_parameters_t const inParameters[],
                               const char* format, ...);
    struct x509_st;
    void PKAuditWithCertificate( pkaudit_severity_t severity, const char* name,
                                struct x509_st* certificate,
                                const char* format, ...);
#if __OBJC__
    void PKardAuditWithInfoV(pkaudit_severity_t severity,
                             const char * name, id parameters,
                             const char * format, va_list args);
    
    void PKAuditWithInfo( pkaudit_severity_t severity,
                         const char * name,
                         id info,
                         const char * format, ...);
    /*
     * Audit a url request, response
     * Either request or response may be nil
     */
    void PKAuditURL(
                    NSURLRequest* request, NSURLResponse* response,
                    NSURLAuthenticationChallenge* authentication,
                    NSError* error,
                    const char * format, ...);
#endif
    
#ifdef __cplusplus
}
#endif

#endif /* PKardSDK_PKAuditTrail_h */
