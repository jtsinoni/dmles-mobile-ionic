//
//  InterAppStatus.h
//  PKardSDK Test
//
//  Created by Paul Nelson on 2/27/13.
//  Copyright (c) 2013 Paul Nelson. All rights reserved.
//
#ifdef __OBJC__

#import "InterAppTransaction.h"
#include "TokenState.h"

@interface InterAppStatus : InterAppTransaction

@end

@interface InterAppGetStatus : InterAppTransaction
@property (atomic, assign) token_state_t    tokenState;
@property (atomic, assign) reader_state_t   readerState;

@end
#endif


#ifdef __cplusplus
extern "C"
{
#endif
    
    void InterAppStatus_broadcast(void);
    /*
     * TokenState_Get returns 1 if successful, else 0
     */
    int TokenState_Get( token_state_t* outTokenState, reader_state_t* outReaderState);

#ifdef __cplusplus
}
#endif
