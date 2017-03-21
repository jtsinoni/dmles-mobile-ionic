//
//  Logging.h
//  HTTPSProtocolTester
//
//  Created by Paul Nelson on 7/7/11.
//  Copyright 2011 Thursby Software Systems, Inc. All rights reserved.
//
#ifndef PKardSDK_Logging_h
#define PKardSDK_Logging_h
#include <stdio.h>

#define LOG_ENCRYPT     0x10    // encrypt the log data
#define LOG_ONELINE     0x20    // make log msg fit on one line
#define LOG_PERSONAL    0x40    // log data contains personal info

#ifdef __cplusplus
extern "C" {
#endif
    
    void TSSLogClearLog();
    extern int TSSLogPersonalContentEnabled;
    extern unsigned int TSSCurrentLogLevel;


#ifdef __OBJC__
#import <Foundation/Foundation.h>
#ifndef THIS_METHOD
#define THIS_METHOD NSStringFromSelector(_cmd)
#endif
    void TSSLogMsgObjC( int level, NSString *fmt, ...) NS_FORMAT_FUNCTION(2,3);
    void TSSLogMsg( int level, const char * fmt, ...);
#define LogError(fmt, ...) TSSLogMsgObjC(LOG_ONELINE|0, @fmt, ##__VA_ARGS__)
#define LogAudit(fmt, ...) TSSLogMsgObjC(LOG_ONELINE|1, @fmt, ##__VA_ARGS__)
#define LogMessage(fmt, ...) TSSLogMsgObjC(LOG_ONELINE|5, @fmt, ##__VA_ARGS__)
#define LogDebug0(fmt, ...) do{if(TSSCurrentLogLevel>=7){TSSLogMsgObjC(7, @fmt, ##__VA_ARGS__);}}while(0)
#define LogDebug(fmt, ...) do{if(TSSCurrentLogLevel>=7){TSSLogMsgObjC(LOG_ONELINE|7, @fmt, ##__VA_ARGS__);}}while(0)
#define LogDebug1(fmt, ...) do{if(TSSCurrentLogLevel>=7){TSSLogMsgObjC(LOG_ONELINE|7, @fmt, ##__VA_ARGS__);}}while(0)
#define LogPersonalContent(fmt,...) do{if(TSSLogPersonalContentEnabled){TSSLogMsgObjC(LOG_ONELINE|LOG_PERSONAL|7, @fmt, ##__VA_ARGS__);}}while(0)
#else /* __OBJC__ */
    void TSSLogMsg( int level, const char * fmt, ...) __attribute((format(printf, 2, 3)));
#define LogError(fmt, ...) TSSLogMsg(LOG_ONELINE|0, fmt, ##__VA_ARGS__)
#define LogAudit(fmt, ...) TSSLogMsg(LOG_ONELINE|1, fmt, ##__VA_ARGS__)
#define LogMessage(fmt, ...) TSSLogMsg(LOG_ONELINE|5, fmt, ##__VA_ARGS__)
#define LogDebug(fmt, ...)  do{if(TSSCurrentLogLevel>=7){TSSLogMsg(LOG_ONELINE|7, fmt, ##__VA_ARGS__);}}while(0)
#define LogDebug1(fmt, ...) do{if(TSSCurrentLogLevel>=7){TSSLogMsg(LOG_ONELINE|7, fmt, ##__VA_ARGS__);}}while(0)
#define LogPersonalContent(fmt, ...) do{if(TSSLogPersonalContentEnabled&&(TSSCurrentLogLevel>=7)){TSSLogMsg(0x77, fmt, ##__VA_ARGS__);}}while(0)
#endif  /* __OBJC__ */
void TSSLogV( int level, const char * fmt, va_list args );
void TSSLogHex(int level,const void* buffer, size_t len, unsigned long address, off_t offset, const char * msg);

#if DEBUG
#define LogDeveloper LogDebug1
#else
#define LogDeveloper(...)
#endif

#define TSSLogLevel() (TSSCurrentLogLevel)
#define TSSLogLevelSet(newLevel) do{TSSCurrentLogLevel=(int)(newLevel);}while(0)

    void TSSLogSetPersonalContentEnabled(int isEnabled);
    void TSSLogLevelUpdateFromPolicy(void);
    void TSSLogErase(void);
    void TSSLogSetMaximumSize(size_t maxSize);
/*
 * TSSLogSetLogFileName may be called before initializing PKard SDK
 */
    void TSSLogSetLogFileName(const char * logFileName);
/*
 * Set up an alternative logger that will handle PKardSDK log messages
 */
    void TSSLogSetLogProvider( void (*provider)(const char* msg, size_t msglen));

#ifdef __cplusplus
}
#endif

#ifdef __OBJC__

#ifdef __cplusplus
extern "C" {
#endif
    void TSSNSLog(NSString* fmt, ...);
#ifdef __cplusplus
}
#endif

#ifdef NSLog
#undef NSLog
#endif
#define NSLog(fmt, ...) TSSNSLog(fmt, ##__VA_ARGS__)

#endif /* __OBJC__ */

#endif /* PKardSDK_Logging_h */
