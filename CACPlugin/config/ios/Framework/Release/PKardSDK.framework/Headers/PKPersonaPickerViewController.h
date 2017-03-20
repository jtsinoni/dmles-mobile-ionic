//
//  PKPersonasViewController.h
//  PKardSDK
//
//  Created by Paul Nelson on 9/8/14.
//  Copyright (c) 2014 Thursby Software Systems, Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <PKardSDK/PKPersonaPickerController.h>
#import <PKardSDK/PKPersonaPickerView.h>


@interface PKPersonaPickerViewController : PKPersonaPickerController
@property (nonatomic, retain) NSString                  *prompt;
@property (nonatomic, retain) IBOutlet UILabel          *helpLabel;
@property (nonatomic, retain) IBOutlet UIButton         *cancelButton;
@property (nonatomic, retain) IBOutlet PKPersonaPickerView   *personasView;

- (IBAction)cancelButton:(id)sender;
@end
