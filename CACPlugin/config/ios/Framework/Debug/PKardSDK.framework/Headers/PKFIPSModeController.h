//
//  PKFIPSModeController.h
//  PKardSDK
//
//  Created by Ken Grigsby on 7/29/11.
//  Copyright 2011 Thursby Software Systems, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

#ifndef __PKardSDK__PKFIPSModeController__
#define __PKardSDK__PKFIPSModeController__

@protocol PKFIPSModeControllerDelegate;

typedef enum {
	PKFIPSModeDisable,
	PKFIPSModeEnable
} PKFIPSMode;

@interface PKFIPSModeController : NSObject
{
}

@property (nonatomic, assign) id<PKFIPSModeControllerDelegate> delegate;

// set the mode displays a progress window when the mode is enabled
- (void)setMode:(PKFIPSMode)mode;

@end

@protocol PKFIPSModeControllerDelegate <NSObject>
@required

- (void)FIPSModeController:(PKFIPSModeController*)controller didFinishWithSuccess:(BOOL)success andState:(BOOL)enabled;

@end

#endif /* __PKardSDK__PKFIPSModeController__ */

