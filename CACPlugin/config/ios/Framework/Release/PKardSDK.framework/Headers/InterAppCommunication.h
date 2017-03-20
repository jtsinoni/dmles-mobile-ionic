//
//  InterAppCommunication.h
//  PKardSDK Test
//
//  Created by Paul Nelson on 2/27/13.
//  Copyright (c) 2013 Paul Nelson. All rights reserved.
//
#ifdef __OBJC__

#import <Foundation/Foundation.h>

extern NSString* PKardSDK_InterAppCommunicationChanged;
BOOL InterAppCommunicationConnectToURL(NSURL *inURL);
#endif

#ifdef __cplusplus
extern "C"
{
#endif
    int InterAppConnectionCount(void);
    void PKInterAppInitialize(void);
#ifdef __cplusplus
}
#endif
