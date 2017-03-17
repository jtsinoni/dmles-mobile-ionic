//
//  wintypes.h
//  PKardSDK
//
//  Created by Paul Nelson on 6/8/12.
//  Copyright (c) 2012 Thursby Software Systems, Inc. All rights reserved.
//

#ifndef __pcsc_wintypes_h__
#define __pcsc_wintypes_h__

#include <stdint.h>

#define WINAPI
#define _param_in
#define _param_in_opt
#define _param_out
#define _param_out_opt
#define _param_inout
#define _param_inout_opt

/* Source Code Annotations */
#define _param_In_
#define _param_In_opt_
#define _param_Out_
#define _param_Out_opt_
#define _param_Inout_

#ifndef BYTE
typedef unsigned char BYTE;
#endif
#ifndef PBYTE
typedef unsigned char *PBYTE;
#endif
typedef unsigned char UCHAR;
typedef unsigned char *PUCHAR;
typedef unsigned short USHORT;

typedef unsigned long	ULONG;
typedef unsigned long	*PULONG;

typedef void		*LPVOID;
typedef const void	*LPCVOID;

#ifndef __OBJC__
typedef signed char	BOOL;
#endif
typedef uint32_t	DWORD;
typedef DWORD		*PDWORD;
typedef DWORD		*LPDWORD;

typedef uint16_t	WORD;
typedef int32_t		LONG;

typedef char		*LPSTR;
typedef const char	*LPCSTR;
typedef const BYTE	*LPCBYTE;
typedef BYTE		*LPBYTE;

typedef int32_t		RESPONSECODE;

#ifdef HANDLE
#undef HANDLE
#endif
typedef char **    HANDLE;
typedef char **    ZHANDLE;

#ifndef INFINITE
#define INFINITE 0xFFFFFFFF
#endif

/* these types are deprecated but still used by old drivers and applications
 * You should use LPSTR instead */
typedef char *LPTSTR;
typedef const char *LPCTSTR;
typedef char *LPCWSTR;
typedef struct {
    char v[16];
} UUID, GUID, *LPGUID;
typedef const GUID *LPCGUID;

#endif
