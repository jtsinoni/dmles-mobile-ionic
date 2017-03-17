//
//  PKRotatingNavController.h
//  PKardSDK
//
//  Created by Paul Nelson on 3/17/15.
//  Copyright (c) 2015 Thursby Software Systems, Inc. All rights reserved.
//

#import <UIKit/UIKit.h>

// A UINavigationController that says it supports all interface orientations
@interface PKRotatingNavController : UINavigationController

@property (nonatomic, copy)     void (  ^dismissHandler)(PKRotatingNavController*);

- (void)shouldDismiss;

@end
