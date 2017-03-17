//
//  PKAccessoryViewController.h
//  PKardSDK
//
//  Created by Ken Grigsby on 7/20/11.
//  Copyright 2011 Thursby Software Systems, Inc. All rights reserved.
//

#ifndef __PKardSDK__PKAccessoryViewController__
#define __PKardSDK__PKAccessoryViewController__

#import <UIKit/UIKit.h>
#import <ExternalAccessory/ExternalAccessory.h>
#import <PKardSDK/PKSmartCardInterface.h>
#import <PKardSDK/TSS_PKI_Data.h>

@class TSS_PKI_Reader;
@interface PKAccessoryViewController : UITableViewController

@property (nonatomic, retain) TSS_PKI_Reader *reader;
@property (nonatomic, retain) NSArray *objects;

@end

#endif /* __PKardSDK__PKAccessoryViewController__ */
