#import <Foundation/Foundation.h>

@interface NSData (Base64)

- (NSString *)hexStringValue;

- (NSString *)base64Encoded;
- (NSData *)base64Decoded;

@end
