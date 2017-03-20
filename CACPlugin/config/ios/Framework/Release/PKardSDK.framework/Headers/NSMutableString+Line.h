//
//  NSMutableString+NSMutableString_Line.h
//  PKardSDK
//
//  Created by Michael McEuin on 6/6/13.
//  Copyright (c) 2013 Thursby Software Systems, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>


// Category for NSMutableString
@interface NSMutableString (line)

- (void)appendStringLine:(NSString *)aString;
- (void)appendFormatLine:(NSString *)format, ... NS_FORMAT_FUNCTION(1,2);

@end
