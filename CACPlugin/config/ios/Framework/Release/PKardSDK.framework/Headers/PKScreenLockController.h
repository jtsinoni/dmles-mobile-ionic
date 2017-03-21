//
//  PKScreenLockController.h
//  PKWeb
//
//  Created by Ken Grigsby on 10/18/11.
//  Copyright (c) 2011 Thursby Software Systems, Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "TSS_PKI_SignatureRecord.h"

FOUNDATION_EXTERN  NSString * _Nonnull  const PKScreenLockDidDismissNotification;
FOUNDATION_EXTERN NSString * _Nonnull const PKScreenLockDidShowNotification;

@protocol PKScreenLockControllerDelegate;

/**
 * Manages the screen lock.
 * PKard SDK will automatically lock the application screen after a smart card
 * was used to perform a cryptographic operation. You can also configure your
 * application so that the user must always unlock the screen when launching
 * the app, and when switching the application to the foreground.
 * To use this method, you must call the TSS_PKI_Identity identityProofRecord and
 * record the resulting signature with recordScreenUnlockProof:
 
 * @see TSS_PKI_Identity identityProofRecord class method
 * @see TSS_PKI_Identity recordScreenUnlockProof class method
 */
@interface PKScreenLockController : UIViewController <UINavigationControllerDelegate>

// A message to display to the user.
@property (nullable, nonatomic, copy) NSString *prompt;

// Button title text, typically Reset or similar.
@property (nullable, nonatomic, copy) NSString *buttonTitle;

// Image to display on the lock screen.
// The default is the Thursby logo.
@property (nullable, nonatomic, retain) UIImage *image;

// The delegate that will receive the protocol callbacks
@property (nullable, nonatomic, assign) id <PKScreenLockControllerDelegate> delegate;

// Normally, alerts are hidden by the lock screen
// Set canShowAlerts if you need to display an alert over the lock screen
// Any new alerts will appear
@property (nonatomic, assign) BOOL canShowAlerts;

// Controls the visibility of the lock screen.
// Should be very rarely used and may be made SDK private in a future release
@property (assign) BOOL hidden;

// Get the singleton instance of the screen lock
+ (nullable PKScreenLockController*)sharedScreenLockController;
/*
 * visibleScreenLockViewController returns the lock screen view controller if the lock screen is showing
 * otherwise return nil
 * code that needs to present over the lock screen should use this method to present their view controllers
 */
+ (nullable UIViewController*)visibleScreenLockViewController;

// Register to various notifications.
// Notifications include token state changes and app lifecycle events.
// Should be called before displaying protected content in the app window.
- (void)registerForSmartCardNotifications;

// Unsubscribe to the same notifications previously registered.
// Should be called if displaying content that is not protected,
// this may be the case for a login view controller that a user would
// always need to see.
- (void)unregisterForSmartCardNotifications;

// Reset the screen lock.
// Invoked when the button is pressed. If the delegate
// responds to the screenLockControllerDidReset: protocol method
// it will be called when the reset is complete. The delegate's implementation
// of screenLockControllerDidReset: should return a boolean indicating if the
// screen lock window should or should not be disimissed after resetting.
- (IBAction)reset:(nullable id)sender;

// Manually invoke the lock screen.
// Requires a signature record or else
// the window will not draw and the screen will not lock.
- (void)userWantsLock;

// Returns an indication about the current lock state.
// YES is returned if the state is unlocked
// NO is returned if the screen is already locked
- (BOOL)screenShouldLock;

// Reset the lock delay timer.
// This should almost never be used and should be made
// private to the SDK. Lock delay value should be
// set via user defaults as indicated in the Toolkit Guide PDF.
- (void)resetLockDelayTimer;

// dismisses the window.
- (void)dismiss;

// Register a window that should be allowed to be displayed over the lock screen
// Calls to registerVisibleWindow must be balanced with calls to unregisterVisibleWindow
- (void)registerVisibleWindow:(nonnull UIWindow*)inWindow;
// Unregister a window previously registered with registerVisibleWindow
- (void)unregisterVisibleWindow:(nonnull UIWindow*)inWindow;

@end


/** Protocol for the PKScreenLockController.
  * Often the app's delegate so that the application
  * can receive callbacks from the scren lock.
 */
@protocol PKScreenLockControllerDelegate <NSObject>

@optional
// Optional callback.
// Called by PKScreenLockController when it did reset.
// return YES if window should be dismissed.
- (BOOL)screenLockControllerDidReset:(nonnull PKScreenLockController*)controller;

@optional
// Optional callback.
// Receive error indicating particular nature of the unlock failure
- (void)screenLockControllerUnlockDidFail:(nonnull NSError*)error;

@end
