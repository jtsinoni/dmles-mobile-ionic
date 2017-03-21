//
//  TSS_Middleware.h
//  TSS_Middleware
//
//  Created by Paul Nelson on 7/28/11.
//  Copyright 2011 Thursby Software Systems, Inc. All rights reserved.
//

#ifndef __TSS_Middleware__Stubs__
#define __TSS_Middleware__Stubs__

#ifdef __cplusplus
extern "C" {
#endif

    /*
     * TSS_Middleware_Initialize
     * Called once at App startup time
     * Returns zero for success, non-zero for unrecoverable failure
     */
    unsigned int TSS_Middleware_Initialize(void);
    /*
     * TSS_Middleware_Reset
     * Called to reset any security related data stored in the middleware framework
     */
    void TSS_Middleware_Reset(void);
    /*
     * TSS_Middleware_Finalize
     * Called once at App termination
     */
    unsigned int TSS_Middleware_Finalize(void);
    /*
     * TSS_Middleware_ProbeInterfaces
     * Called by the App whenever it is about to do an operation that might want to use a smart card, like sign data.
     * This provides a poll for readers that do not support notification when cards are inserted or removed
     */
    void TSS_Middleware_ProbeInterfaces(void);

#ifdef __cplusplus
}
#endif

#ifdef __OBJC__

#include <PKardSDK/PKSmartCardInterface.h>

@interface TSS_Middleware : NSObject <PKSmartCardInterface>

+(TSS_Middleware*)shared;
-(void)reset;
-(NSDictionary*)readerAttributes;
-(NSDictionary*)accessoryAttributes:(id)inAccessory;

@end

#endif

#endif
