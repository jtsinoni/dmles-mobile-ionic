//
//  PKardTestCase.h
//  PKardSDK
//
//  Created by Paul Nelson on 5/31/13.
//  Copyright (c) 2013 Thursby Software Systems, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

FOUNDATION_EXPORT NSString * const TSS_Test_InAppTestingCompleteNotification;

typedef enum {
    kTestStateInitialized = 0,
    kTestStateReady = 1,
    kTestStateExecuting = 2,
    kTestStateComplete = 3,
} test_case_state_t;

@protocol PKardTestCaseDelegateProtocol;
@interface PKardTestCase : NSOperation

@property (nonatomic, strong) NSString* title;
@property (nonatomic, strong) NSString* testCaseName;
@property (atomic, assign) BOOL success;
@property (atomic, assign) BOOL expectFailure;
@property (nonatomic, strong) NSMutableDictionary* info;
@property (nonatomic, strong) NSMutableArray* messages;
@property (nonatomic, strong) NSString* script;
@property (nonatomic) BOOL running;
@property (nonatomic, assign) BOOL viewingDetails;       // used by a view controller
@property (atomic, assign) test_case_state_t testState;

@property (nonatomic, retain) id<PKardTestCaseDelegateProtocol>  delegate;

-(void)complete;
-(id)initWithScript:(NSString*)scriptLine;
-(id)initWithName:(NSString*)name;

// testsWithScript:queue: should return the number of concurrent operations allowed
-(NSInteger)testsWithScript:(NSString*)scriptFile queue:(NSMutableArray*)outQueue;
-(NSInteger)testsWithScriptText:(NSString*)script queue:(NSMutableArray*)outQueue;

+(void)tests:(NSMutableArray*)queue;

-(void)addError:(NSError*)inError;
-(void)addResult:(BOOL)inResult file:(const char *)file line:(int)inLine format:(NSString*)inFormat, ...;
-(void)addAssert:(BOOL)inResult file:(const char *)file line:(int)inLine assertion:(NSString*)inAssertion format:(NSString*)inFormat, ...;

-(NSString*)classTitle; // subclasses should override this

/*
 * reset the test case so it can be started again
 * subclasses should override this if necessary
 */
-(void)reset;

#define TPASS(fmt,...) [self addResult:YES file:__FILE__ line:__LINE__ format:fmt, ##__VA_ARGS__]
#define TFAIL(fmt,...) [self addResult:NO file:__FILE__ line:__LINE__ format:fmt, ##__VA_ARGS__]
#define TASSERT( expr, fmt, ... ) \
do {\
if( !(expr) ) [self addAssert:(expr) file:__FILE__ line:__LINE__ assertion:@"#expr" format:fmt, ##__VA_ARGS__];\
} while(0)
@end


@protocol PKardTestCaseDelegateProtocol <NSObject>

- (void)testCase:(PKardTestCase*)inTestCase didComplete:(BOOL)passed;

@end
