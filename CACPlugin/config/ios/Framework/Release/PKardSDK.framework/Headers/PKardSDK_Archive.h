//
//  PKardSDK_Archive.h
//  PKardSDK
//
//  Created by Paul Nelson on 6/5/13.
//  Copyright (c) 2013 Thursby Software Systems, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol PKardSDK_ArchiveDelegateProtocol;

@interface PKardSDK_Archive : NSObject
@property (nonatomic, readonly, strong) UIViewController* viewController;
@property (nonatomic, retain) id <PKardSDK_ArchiveDelegateProtocol> delegate;
@property (nonatomic, retain) NSURL* URL;

+ (BOOL) canOpenURL:(NSURL*)inURL;
- (id) initWithURL:(NSURL*)inURL;
- (UIViewController*) extractWithViewController;

@end

@protocol PKardSDK_ArchiveDelegateProtocol <NSObject>

- (void)PKardSDK_ArchiveDidDismissViewController:(UIViewController*)viewController;
@end
