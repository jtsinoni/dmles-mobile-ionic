//
//  winscard_private.h
//  PKardSDK
//
//  Created by Paul Nelson on 6/8/12.
//  Copyright (c) 2012 Thursby Software Systems, Inc. All rights reserved.
//

#ifndef PKardSDK_winscard_private_h
#define PKardSDK_winscard_private_h

#include <winscard.h>
#include "thread_generic.h"

#define IBS_POWER_UP			500 /**< power up the card */
#define IBS_POWER_DOWN			501 /**< power down the card */
#define IBS_RESET			502 /**< warm reset */

#define IBS_NEGOTIATE_PTS1		1   /**< negotiate PTS1 */
#define IBS_NEGOTIATE_PTS2		2   /**< negotiate PTS2 */
#define IBS_NEGOTIATE_PTS3              4   /**< negotiate PTS3 */

#define	IBS_SUCCESS			0   /**< no error */
#define IBS_ERROR_TAG			600 /**< tag unknown */
#define IBS_ERROR_SET_FAILURE		601 /**< set failed */
#define IBS_ERROR_VALUE_READ_ONLY	602 /**< value is read only */
#define IBS_ERROR_PTS_FAILURE		605 /**< failed to negotiate PTS */
#define IBS_ERROR_NOT_SUPPORTED		606
#define IBS_PROTOCOL_NOT_SUPPORTED	607 /**< requested protocol not supported */
#define IBS_ERROR_POWER_ACTION		608 /**< power up failed */
#define IBS_ERROR_SWALLOW		609
#define IBS_ERROR_EJECT			610
#define IBS_ERROR_CONFISCATE		611
#define IBS_COMMUNICATION_ERROR		612 /**< generic error */
#define IBS_RESPONSE_TIMEOUT		613 /**< timeout */
#define IBS_NOT_SUPPORTED		614 /**< request is not supported */
#define IBS_ICC_PRESENT			615 /**< card is present */
#define IBS_ICC_NOT_PRESENT		616 /**< card is absent */
/**
 * The \ref IBS_NO_SUCH_DEVICE error must be returned by the driver when
 * it detects the reader is no more present. This will tell pcscd to
 * remove the reader from the list of available readers.
 */
#define IBS_NO_SUCH_DEVICE		617
#define IBS_ERROR_INSUFFICIENT_BUFFER	618 /**< buffer is too small */


struct ProtOptions
{
    DWORD dwProtocol_Type;	/* Protocol Type */
    DWORD dwCurrent_Clock;	/* Current Clock */
    DWORD dwCurrent_F;		/* Current F */
    DWORD dwCurrent_D;		/* Current D */
    DWORD dwCurrent_N;		/* Current N */
    DWORD dwCurrent_W;		/* Current W */
    DWORD dwCurrent_IFSC;	/* Current IFSC */
    DWORD dwCurrent_IFSD;	/* Current IFSD */
    DWORD dwCurrent_BWT;	/* Current BWT */
    DWORD dwCurrent_CWT;	/* Current CWT */
    DWORD dwCurrent_EBC;	/* Current EBC */
};

typedef struct ProtOptions PROT_OPTIONS, *PPROT_OPTIONS;

struct ReaderContext
{
    
    PCSCLITE_MUTEX_T mMutex;	/* Mutex for this connection */
    LPVOID vHandle;			/* Dlopen handle */
    DWORD dwSlot;			/* Current Reader Slot */
    DWORD dwBlockStatus;	/* Current blocking status */
    DWORD dwLockId;			/* Lock Id */
    DWORD dwIdentity;		/* Shared ID High Nibble */
    int32_t dwContexts;		/* Number of open contexts */
    PDWORD pdwMutex;		/* Number of client to mutex */
    struct pubReaderStatesList *readerState; /* link to the reader state */
    
    //									 capabilities */
    PROT_OPTIONS psProtOptions;	/* Structure of protocol options */
    UCHAR ucAtr[SCARD_ATR_LENGTH];	/* Atr for inserted card */
    DWORD dwAtrLen;			/* Size of the ATR */
    DWORD dwProtocol;		/* Currently used protocol */
    DWORD dwStatus;			/* Current Status Mask */
};

typedef struct ReaderContext READER_CONTEXT, *PREADER_CONTEXT;	


#define BLOCK_STATUS_RESUME		0x00FF	/**< Normal resume */
#define BLOCK_STATUS_BLOCKING		0x00FA	/**< Function is blocking */
#define MAX_READERNAME			52
#define MAX_ATR_SIZE SCARD_ATR_LENGTH

#define PCSCLITE_STATUS_POLL_RATE	400000		/**< Status polling rate */
#ifndef INFINITE
#define INFINITE			0xFFFFFFFF	/**< Infinite timeout */
#endif
#define PCSCLITE_INFINITE_TIMEOUT	4320000		/**< 50 day infinite t/o */
#define PCSCLITE_STATUS_WAIT		200000	/**< Status Change Sleep */

/*
 * Gets a stringified error response
 */
char *pcsc_stringify_error(int32_t err);

#define PCSC_NOTIFY_CARDINSERTED "PCSC_NOTIFY_CARDINSERTED"
#define PCSC_NOTIFY_CARDREMOVED "PCSC_NOTIFY_CARDREMOVED"

#endif
