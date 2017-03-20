//
//  TSS_Site.h
//  PKWeb
//
//  Created by Paul Nelson on 7/19/11.
//  Copyright 2011 Thursby Software Systems, Inc. All rights reserved.
//

#ifndef __TSS_Site__PKWeb__
#define __TSS_Site__PKWeb__
#include <PKardSDK/TSS_PKI.h>

tss_pki_assertions_t TSS_SiteFiles_Lookup( const char * url );

#if __OBJC__

#define kTSS_SiteURLsKey @"URLs"
#define kTSS_SiteCertAssertionsKey @"certAssertions"
#define kTSS_SiteNameKey @"name"
#define kTSS_SiteURLKey @"URL"
#define kTSS_SiteUserAgentKey @"User-Agent"
#define kTSS_SiteCertPredicates @"predicates"

#import <Foundation/Foundation.h>

@interface TSS_Site : NSObject
@property (nonatomic, retain) NSString* category;
@property (nonatomic, retain) NSString* name;
@property (nonatomic, retain) NSURL* URL;
@property (assign, readonly) tss_pki_assertions_t certificateAssertions;
@property (nonatomic, retain) NSString* userAgent;
@property (atomic, readonly) BOOL removeCookies;

+(NSArray*)sites;   // return an array of TSS_Site objects
+(TSS_Site*)lookup:(NSURL *)url;
+(TSS_Site*)siteForURL:(NSURL*)inURL;
+(void)mergePolicySites:(NSDictionary*)info;

// addSite and removeSiteForURL only affect the in-memory cache.  They do not modify persistent storage
+(void)addSite:(TSS_Site*)inSite;
+(void)removeSiteForURL:(NSURL*)inURL;

-(TSS_Site*)initWithInfo:(NSDictionary*)info;

/*
 * set Default User Agent
 */
+ (void)setDefaultUserAgent:(NSString*)inUserAgent;
+ (NSString*)defaultUserAgent;
@end

@protocol TSS_SiteProtocol <NSObject>

- (void)addSiteToBookmarks:(TSS_Site*)inSite;

@end

#endif

#endif /* __TSS_Site__PKWeb__ */
