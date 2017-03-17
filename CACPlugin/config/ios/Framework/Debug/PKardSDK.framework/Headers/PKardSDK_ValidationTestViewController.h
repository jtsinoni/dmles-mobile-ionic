//
//  PKardSDK_ValidationTestViewController.h
//  PKardSDK
//
//  Created by Paul Nelson on 5/30/13.
//  Copyright (c) 2013 Thursby Software Systems, Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "PKardTestCase.h"
#import "PKardSDK_Archive.h"

@interface PKardSDK_ValidationTestViewController : UITableViewController <PKardTestCaseDelegateProtocol, UIDocumentInteractionControllerDelegate>
@property (nonatomic, strong) NSURL* URL;
@property (nonatomic, strong) NSMutableArray* testCases;
@property (nonatomic, retain) UILabel* headerInfo;
@property (nonatomic, retain) UIBarButtonItem* startExportButton;

- (BOOL)loadScript:(NSString*)script forTest:(NSString*)testName;

+ (BOOL) canOpenURL:(NSURL*)inURL;

@end
