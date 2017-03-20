//
//  PKPasscodeController.h
//  Passcode
//
//  Created by Ken Grigsby on 4/26/11.
//  Copyright 2011 Thursby Software Systems, Inc. All rights reserved.
//

#import <UIKit/UIKit.h>

/*
 * Notes:
 * Two keys on the keypad are overloaded with two functions:
 * The bottom left key shows the keyboard icon when the PIN entry has no characters,
 * and it shows 'Done' when it has characters
 * The bottom right button shows 'Cancel' when the PIN entry has no characters,
 * and shows the Delete icon when it has characters
 */

@protocol PKPasscodeControllerDelegate;

@class PKPasscodeView;
@interface PKPasscodeController : UIViewController
{
	NSMutableString *_pinCode;
	NSInteger _attemptsRemaining;
	UIWindow *_window;
	
	struct {
        unsigned int delegateIsPinValid:1;
        unsigned int delegateDidCancel:1;
	} _passcodeFlags;
}

@property (nonatomic, assign)     id<PKPasscodeControllerDelegate> delegate;
@property (nonatomic, retain)     IBOutlet PKPasscodeView *passcodeView;
@property (nonatomic, retain)     IBOutlet UIView *keypadView;
@property (nonatomic, retain)     IBOutlet UITextField *pinField;
@property (nonatomic, retain)     IBOutlet UIButton *cancelDeleteButton;
@property (nonatomic, retain)     IBOutlet UIButton *keyboardDoneButton;
@property (nonatomic, retain)     IBOutlet UIImageView *statusImageView;
@property (nonatomic, retain)     IBOutlet UILabel *statusInitialLabel;
@property (nonatomic, retain)     IBOutlet UILabel *statusMessageLabel;
@property (nonatomic, retain)     IBOutlet UILabel *statusDetailLabel;
@property (nonatomic, retain)     IBOutlet UILabel *statusReasonLabel;
@property (nonatomic, retain)      NSString* reasonForAsking;
@property (atomic, assign)        BOOL useAnimation;

@property (atomic, assign)        BOOL alphanumericPIN;
@property (nonatomic, assign)     NSInteger attemptsRemaining;

+ (PKPasscodeController*)newPasscodeController;

- (IBAction)numberKeyPressed:(id)sender;
- (IBAction)cancelDeleteKeyPressed:(id)sender;
- (IBAction)keyboardDoneKeyPressed:(id)sender;

- (void)show;
- (void)dismissWithCompletionHandler:(void (^)(void))completionHandler;

// This needs to be called in response to passcodeController:isPINValid: to
// handle the response and will dismiss the view if the pin is valid.
// This can be called from a background thread
- (void)replyToIsPinValid:(BOOL)isValid;

@end



@protocol PKPasscodeControllerDelegate <NSObject>

@optional
// If the pin is not valid the client should set attemptsRemaining to inform the user
- (void)passcodeController:(PKPasscodeController*)controller isPINValid:(NSString*)pin;

// The controller dismisses itself when the pin is valid or the user cancels
- (void)passcodeControllerDidCancel:(PKPasscodeController*)controller;

@end

@interface PKPasscodeView: UIView
@property (nonatomic, retain) IBOutlet UIView *entry;
@property (nonatomic, retain) IBOutlet UIView *status;
@property (nonatomic, retain) IBOutlet UIView *keypad;
@property (nonatomic, retain) IBOutlet NSLayoutConstraint *keyHeight;
@property (nonatomic, retain) IBOutlet NSLayoutConstraint *entryHeight;
@end
