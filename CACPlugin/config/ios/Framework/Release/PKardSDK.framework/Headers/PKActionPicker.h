//
//  PKActionPicker.h
//  PKardSDK
//
//  Created by Paul Nelson on 10/9/14.
//  Copyright (c) 2014 Thursby Software Systems, Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreGraphics/CoreGraphics.h>

typedef enum {
    kPKActionPickerStyleAction  = 0,        // matches UIAlertControllerStyleAction
    kPKActionPickerStyleAlert   = 1,        // matches UIAlertControllerStyleAlert
} PKActionPickerControllerStyle;

typedef enum {
    kPKActionStyleDefault = 0,      // UIAlertActionStyleDefault
    kPKActionStyleCancel = 1,       // UIAlertActionStyleCancel
    kPKActionStyleDestructive = 2,  // UIAlertActionStyleDestructive
} PKActionStyle;

@interface PKAction : NSObject
@property (nonatomic, readonly)   NSString                  *title;
@property (nonatomic, readonly)   PKActionStyle             style;
@property (atomic, assign)        BOOL                      enabled;
@property (atomic, assign)        BOOL                      isCancel;
@property (atomic, assign)        int                       actionTag;

// You may save objects in a PKAction
- (id)objectForKeyedSubscript:(id)key;
- (void)setObject:(id)object forKeyedSubscript:(id)key;

+ (instancetype)actionWithTitle:(NSString*)inTitle
                          style:(PKActionStyle)inStyle
                        handler:(void (^)(PKAction *action))handler;
+ (PKAction*)cancelAction:(void (^)(PKAction *action))handler;
+ (PKAction*)okAction:(void (^)(PKAction *action))handler;
@end

@interface PKActionPicker : NSObject
@property(nonatomic, readonly) PKActionPickerControllerStyle preferredStyle;
@property(nonatomic, readonly) NSArray  *actions;
@property (nonatomic, copy)     void (  ^dismissHandler)(void);
@property (nonatomic, assign)   CGRect  sourceRect;

+ (instancetype)actionPickerWithTitle:(NSString*)inTitle message:(NSString*)inMessage;
+ (instancetype)alertPickerWithTitle:(NSString*)inTitle message:(NSString*)inMessage;

- (instancetype)initWithTitle:(NSString*)inTitle message:(NSString*)inMessage style:(PKActionPickerControllerStyle)inStyle;

- (void)presentFrom:(UIViewController*)inController using:(id)fromElement;
- (void)present;

- (void)addAction:(PKAction*)inAction;
- (void)addActionWithTitle:(NSString*)inTitle handler:(void (^)(PKAction *action))handler;

- (BOOL)isVisible;
- (void)dismissWithCancelButton;
- (void)dismiss;
@end
