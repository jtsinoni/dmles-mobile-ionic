//
//  PKZeroDataAtRest.h
//  PKWeb
//
//  Created by Paul Nelson on 6/18/13.
//  Copyright (c) 2013 Thursby Software Systems, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

void PKZeroDataAtRest( BOOL writeEnable, BOOL removeFiles );

@class PKZeroDataAtRestState;

PKZeroDataAtRestState* PKZeroDataAtRestStateCreate_AllowWritingTo( NSString *targetPath );
void PKZeroDataAtRest_ExemptFile( NSString *targetPath );
NSError * PKZeroDataAtRest_WriteDataToFile( NSData* data, NSURL *file);
NSError * PKZeroDataAtRest_DeleteFile(NSURL *file);
void PKZeroDataAtRestState_Restore( PKZeroDataAtRestState *state );
