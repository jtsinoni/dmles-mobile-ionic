//
//  PKDiagnosticsViewController.h
//  PKardSDK
//
//  Created by Paul Nelson on 8/13/15.
//  Copyright (c) 2015 Thursby Software Systems, Inc. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface PKDiagnosticsViewController : UIViewController
@property (nonatomic, retain) IBOutlet UILabel       *currentMode;
@property (nonatomic, retain) IBOutlet UIButton      *switchModes;
@property (nonatomic, retain) IBOutlet UITextField   *callNumber;
@property (nonatomic, retain) IBOutlet UITextField   *emailAddress;
@property (nonatomic, retain) IBOutlet UITextView    *instructions;
@property (nonatomic, retain) IBOutlet UIView        *uploadingView;
@property (nonatomic, retain) IBOutlet UIView        *completedView;
@property (nonatomic, retain) IBOutlet UIView        *infoBackground;
@property (nonatomic, retain) IBOutlet UILabel       *uploadCompleteTitle;
@property (nonatomic, retain) IBOutlet UILabel       *uploadFailureReason;
@property (nonatomic, retain) IBOutlet UIProgressView *progressView;
@property (nonatomic, retain) IBOutlet UISwitch      *collectPersonalData;

- (IBAction)startStopLogging:(id)sender;
- (IBAction)uploadCompletedOK:(id)sender;

+ (PKDiagnosticsViewController*)diagnosticViewController;
@end
