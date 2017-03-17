//
//  TSS_PKI_Object.h
//  PKardSDK
//
//  Created by Paul Nelson on 4/9/13.
//  Copyright (c) 2013 Thursby Software Systems, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#include <PKardSDK/TSS_PKI.h>

@class UINavigationController;

@interface TSS_PKI_Object : NSObject
{
    tss_pki_identifier_t            _identifier;
    tss_pki_authorization_handle    _authorization[tss_pki_acr_operation_max];
}
@property (nonatomic, readonly, retain) NSData*           contents;
@property (nonatomic, readonly, copy) NSString *title;
@property (nonatomic, readonly, copy) NSString *fullTitle;
@property (nonatomic, readonly, copy) NSString *key;
@property (readonly) BOOL canDisplayDetails;
@property (atomic, assign) pid_t processID;

- (id)initWithIdentifier:(tss_pki_identifier_t*)inIdentifier;
- (NSData*)copyData;
- (void)getIdentifier:(tss_pki_identifier_t*)outIdentifier;

/*
 * returns a base64 encoded unique identifier for the token
 * that this object resides in
 */
- (NSString*)tokenUniqueIdentifier;

- (void)pushDetailView:(UINavigationController*)parentController;

@end
