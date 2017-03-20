//
//  TokenState.h
//  TSS_Middleware
//
//  Created by Paul Nelson on 12/7/11.
//  Copyright (c) 2011 Thursby Software Systems, Inc. All rights reserved.
//

#ifndef TSS_Middleware_TokenState_h
#define TSS_Middleware_TokenState_h
#include <CoreFoundation/CoreFoundation.h>

#ifdef __cplusplus
extern "C" {
#endif
    
    typedef enum {
        kTokenStateInvalid = -1,
        kTokenStateNotPresent = 0,
        kTokenStateCardUnpowered = 2,
        kTokenStateCardReadying = 3,
        kTokenStateReadyForUse = 4,
        kTokenStateFailure = 5,
    } token_state_t;
    
    typedef enum {
        kReaderStateInvalid = -1,
        kReaderStateNotAttached = 0,
        kReaderStateReadying = 1,
        kReaderStateAttached = 2,
        kReaderStateFailure = 3,
    } reader_state_t;
    
    
#define TOKEN_STATE_CHANGED_NOTICE   "PKTokenStateChangedNotice"
    
    void TokenStateChanged( token_state_t newState );
    void ReaderStateChanged(reader_state_t newState);
    
    token_state_t TokenStateCurrent();
    reader_state_t ReaderStateCurrent();
    
    extern CFStringRef TokenStateKey;
    extern CFStringRef ReaderStateKey;
    extern CFStringRef PreviousTokenStateKey;
    extern CFStringRef PreviousReaderStateKey;
    
	extern CFStringRef GetStringFromTokenState(token_state_t state);
	extern CFStringRef GetStringFromReaderState(reader_state_t state);
    
    extern void PCSCNotifyChange(void);

#ifdef __cplusplus
}
#endif

#endif
