//
//  PKPersonasView.h
//  PKardSDK
//
//  Created by Paul Nelson on 9/2/14.
//  Copyright (c) 2014 Thursby Software Systems, Inc. All rights reserved.
//

/*
 * PKPersonasView is a subclass of UIScrollView
 * It will display a list of items corresponding to available identities
 * or other objects, and will display enough detail for a user to choose 
 * an item from the list.
 * If you want the user to choose a whole token, then set groupIdentitiesByPersona
 * TRUE.
 *
 * To control what choices appear, you can set personaAssertions.  For example,
 * If you only want identities that can be used for SSL client authentication,
 * you should set personaAssertions to kAssertCertificateExtendedUsageClientAuth.
 * Likewise, if you want to choose an identity for SMIME, set personaAssertions
 * to kAssertCertificateExtendedUsageEmailProtection.
 *
 * If you want full distinguished names to appear, set showDistinguishedNames TRUE
 * but be aware that distinguished names are long, and the relevant parts may
 * not appear if the view is too narrow.
 */

#import <UIKit/UIKit.h>
#import <PKardSDK/TSS_PKI_Identity.h>
#import <PKardSDK/NSDictionary+PKPersona.h>

typedef enum {
    kPersonaCertificateDetailNone = 0,     // don't include cert info (fastest)
    kPersonaCertificateDetailNames = 1,    // show subject name and alt names
    kPersonaCertificateDetailAll = 2,      // show as much detail as possible
} PKPersonaCertificateDetail_t;

@protocol PKPersonaPickerDelegate;

@interface PKPersonaPickerView : UIView

/*
 * set these colors if you need to customize the view
 */
@property (nonatomic, retain) UIColor *personaBackgroundColor;
@property (nonatomic, retain) UIColor *personaTextColor;

/*
 * Provide a custom prompt at the top of the view 
 * If both prompt and URL are not set, no prompt will appear
 * If only a URL is set, a default prompt value will be applied
 */
@property (nonatomic, retain) NSString          *prompt;
@property (nonatomic, retain) NSURL             *URL;

@property (nonatomic, retain) id<PKPersonaPickerDelegate> delegate;
/*
 * persona is set when the user selects a row (touches a "persona")
 * persona has the following keys:
 *  @"identities" is an NSArray of TSS_PKI_Identity that make up the persona
 *  @"titles" is an NSArray of NSString containing the text shown for the persona.
 *  @"DNs" is an Array of NSString containing a list of distinguished names
 *      found in the identities for the persona.
 *  @"token" is an NSString containing the name of the token where the persons
 *      reside.
 */
@property (nonatomic, retain, readonly) NSDictionary *persona;
/*
 * personaAssertions and keyUsageOID should be set to filter the types of
 * identities to include in the view
 *
 * keyUsageOID is nil by default.  If it is set to an OID string, it will
 * be used instead of personaAssertions.
 *
 * The default value for personaAssertions is kAssertCertificateExtendedUsageClientAuth
 */
@property (atomic, assign) tss_pki_assertions_t     personaAssertions;
@property (nonatomic, retain) NSString*             keyUsageOID;
/*
 * if groupIdentitiesByPersona is TRUE
 * then the view will only contain one item for all the identities
 * that go with a persona that match personaAssertions
 *
 * if groupIdentitiesByPersona is FALSE
 * then the view will contain one item for each identity that matches 
 * personaAssertions
 */
@property (atomic, assign) BOOL                 groupIdentitiesByPersona;

/*
 * certificateDetail controls the amount of detail shown in each row.
 * See PKPersonaCertificateDetail_t above.
 * Note that setting certificateDetail to something other than the default, 
 * certificates may need to be fetched from smart cards, and display will 
 * be slower.
 * The default value is kPersonasCertificateDetailNone
 */
@property (atomic, assign) PKPersonaCertificateDetail_t certificateDetail;

/*
 * do not call willTerminate directly
 */
- (void)willTerminate;

@end

@class TSS_PKI_Identity;
@protocol PKPersonaPickerDelegate <NSObject>

/*
 * called when a user touches (chooses) a "persona" in the view
 * persona is the same as view.persona (see description for the 
 * persona property)
 */
- (void)PKPersonaPickerView:(PKPersonaPickerView*)view userDidChoosePersona:(NSDictionary*)persona;

@end
