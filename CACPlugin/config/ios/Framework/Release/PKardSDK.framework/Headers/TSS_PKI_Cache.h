//
//  TSS_PKI_Cache.h
//  PKWeb
//
//  Created by Paul Nelson on 7/10/11.
//  Copyright 2011 Thursby Software Systems, Inc. All rights reserved.
//

#ifdef __OBJC__

#import <Foundation/Foundation.h>

@interface TSS_PKI_CacheCertificate : NSObject

@property (nonatomic, retain) NSData* content;
@property (nonatomic, retain) NSString* certID;
@property (nonatomic, retain) NSString* path;

-(TSS_PKI_CacheCertificate*) initWithPath:(NSString*)path;
@end

@interface TSS_PKI_CacheCard : NSObject

@property (nonatomic, retain) NSString* path;
@property (nonatomic, retain) NSMutableDictionary* contents;

-(TSS_PKI_CacheCard*) initWithPath:(NSString*)path;
-(TSS_PKI_CacheCertificate*)lookupCertificateWithID:(NSString*)certID;
-(TSS_PKI_CacheCertificate*)updateCertificateWithID:(NSString*)certID data:(NSData*)certificate;
-(void)destroy;
@end

@interface TSS_PKI_Cache : NSObject

@property (nonatomic, retain) NSString* path;
-(NSMutableArray*)contents;    // array of TSS_PKI_CacheCard objects
-(TSS_PKI_CacheCard*)lookupCardID:(const char*) cardIdentifier length:(int)cardIdentifierLength;
+(TSS_PKI_Cache*)defaultCache;
-(void)reloadCache;
-(void)clearCache;
@end

#endif

#ifdef __cplusplus
extern "C" {
#endif
    
    const char * TSS_PKI_CacheFolder(void);
    
#ifdef __cplusplus
}
#endif
