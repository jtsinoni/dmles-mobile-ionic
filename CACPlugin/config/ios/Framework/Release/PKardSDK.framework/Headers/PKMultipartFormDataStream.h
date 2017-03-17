//
//  PKMultipartFormDataStream.h
//  PKardSDK
//
//  Created by Paul Nelson on 8/13/15.
//  Copyright (c) 2015 Thursby Software Systems, Inc. All rights reserved.
/*
// PKMultipartFormDataStream can be used to POST form data, including the content of a file
// To use this class:
 1. Create an instance using alloc, init
 2. Add form data using either addName:value: or  addFilePathAsForData:formName:fileName:encoding:  Note that most web servers require the name value pairs to be returned in a specific order.  The order is normally derived from an HTML form received earlier.
 3. If your server is expecting a response from a "submit" button, be sure to add the value using addName:value as the last item added.
 4. To upload the form, create an NSMutableURLRequest object with the desired URL
 5. Add the instance of PKMultipartFormDataStream to the request using setHTTPBodyStream:
 6. Set the request method using setHTTPMethod:@"POST"
 7. Add the HTTP header for the content type using the PKMultipartFormDataStream contentType property as the value and @"Content-Type" for the header field name
 8. Set the HTTP header for the content length using the PKMultipartFormDataStream contentLength property and @"Content-Length" for the header field name;
 You should be ready to use the NSMutalbeURLRequest with NSURLSession or NSURLConnection
 Note that NSURLSession does NOT use PKard TLS networking
*/

#import <Foundation/Foundation.h>

#include <sys/stat.h>
#import <sys/mman.h>
#import <fcntl.h>

@interface PKMultipartFormDataStream : NSInputStream
{
    int     _fd;
    struct stat     _stbuf;
    void            *_mappedContents;
    off_t           _fileOffset;
}

@property (readonly)            NSString* contentLength;

@property (atomic, assign)      NSUInteger bytesSent;
@property (assign, atomic)      NSStreamStatus streamStatus;
@property (strong, nonatomic, getter=getAuditError) NSError* fileStreamError;
@property (copy, nonatomic)     NSRunLoop* scheduledRunLoop;
@property (copy, nonatomic)     NSString* scheduledRunLoopMode;
@property (nonatomic, readonly) NSString        *contentType;

// after creating a PKFileStream object, the user must add content using the following methods
- (void)addFilePath:(NSString*)path fileName:(NSString*)name encoding:(NSString*)contentEncoding;
- (void)addFilePathAsFormData:(NSString*)path formName:(NSString*)inFormName fileName:(NSString*)fileName encoding:(NSString*)inEncoding;
// addName:value: only accepts inValues that are NSString or NSNumber
- (void)addName:(NSString*)name value:(id)inValue;
@end
