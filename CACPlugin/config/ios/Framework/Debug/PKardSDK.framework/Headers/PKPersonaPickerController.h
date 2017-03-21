//
//  PKPersonaPickerController.h
//  PKardSDK
//
//  Created by Paul Nelson on 4/1/16.
//  Copyright © 2016 Thursby Software Systems, Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <PKardSDK/TSS_PKI.h>

@class PKPersonaPickerController;
@protocol PKPersonaPickerControllerDelegate
@required
- (void)PKPersonaPickerController:(nonnull PKPersonaPickerController*)controller didChoosePersona:(nonnull NSDictionary*)info;
- (void)PKPersonaPickerControllerUserCancelled:(nonnull PKPersonaPickerController*)controller;
@end

@interface PKPersonaPickerController : UIViewController
@property (nullable, nonatomic, retain)   NSURL *URL;
@property (nullable, nonatomic, retain)   id<PKPersonaPickerControllerDelegate>   delegate;

+ (nonnull instancetype) pickerWithUsage:(nullable NSString*)keyUsageOID
                                     URL:(nonnull NSURL*)inURL
                                delegate:(nullable id<PKPersonaPickerControllerDelegate>)inDelegate;
+ (nonnull instancetype) pickerWithAssertions:(tss_pki_assertions_t)inAssertions
                                          URL:(nonnull NSURL*)inURL
                                     delegate:(nullable id<PKPersonaPickerControllerDelegate>)inDelegate;

- (void)dismissWithCompletion: (void (^ __nullable)(void))completion;
- (void)present;

@end
