//
//  KeychainIdentity.h
//  PK_KCID
//
//  Created by Randy Boring on 6/5/15.
//  Copyright (c) 2015 Thursby Software Systems, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>


#ifdef __cplusplus
extern "C" {
#endif


NSArray* allKeychainIdentities();

// might expose these as well:
//BOOL isToBeTrusted(SecTrustRef id_trust);
//NSString* copyCertificateLabelFromIdentity(SecIdentityRef idref);

#if USE_KEYCHAIN_GROUP
NSString *tss_kc_access_group();
#endif

BOOL loadIdentityFromData(NSData *p12contents, NSString *passphrase, NSString **outTempTokenLabel, NSString **outTempPIN, NSError **outError);

// returns array of NSDictionary
NSArray *identitiesWithLabel(NSString *inLabel);
BOOL delete_items_with_label(NSString *label, NSError **outError);
BOOL is_PIN_for_identities_with_label(NSString *labelToMatch, NSString *inPIN, NSError **outError);
BOOL set_PIN_for_identities_with_label(NSString *labelToMatch, NSString *inPIN, NSError **outError);
	
	
#ifdef __cplusplus
}
#endif
