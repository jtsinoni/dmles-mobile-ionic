//
//  winsmcrd.h
//  PKardSDK
//
//  Created by Paul Nelson on 2/25/13.
//  Copyright (c) 2013 Thursby Software Systems, Inc. All rights reserved.
//

#ifndef PKardSDK_Header_h
#define PKardSDK_Header_h

#define SCARD_CTL_CODE(code) (0x42000000 + (code))

/**
 * PC/SC part 10 v2.02.07 March 2010 reader tags
 */
#define CM_IOCTL_GET_FEATURE_REQUEST SCARD_CTL_CODE(3400)

#define FEATURE_VERIFY_PIN_START         0x01
#define FEATURE_VERIFY_PIN_FINISH        0x02
#define FEATURE_MODIFY_PIN_START         0x03
#define FEATURE_MODIFY_PIN_FINISH        0x04
#define FEATURE_GET_KEY_PRESSED          0x05
#define FEATURE_VERIFY_PIN_DIRECT        0x06 /**< Verify PIN */
#define FEATURE_MODIFY_PIN_DIRECT        0x07 /**< Modify PIN */
#define FEATURE_MCT_READERDIRECT         0x08 /**< deprecated */
#define FEATURE_MCT_READER_DIRECT        0x08
#define FEATURE_MCT_UNIVERSAL            0x09
#define FEATURE_IFD_PIN_PROPERTIES       0x0A /**< retrieve properties of the IFD regarding PIN handling */
#define FEATURE_ABORT                    0x0B
#define FEATURE_SET_SPE_MESSAGE          0x0C
#define FEATURE_VERIFY_PIN_DIRECT_APP_ID 0x0D
#define FEATURE_MODIFY_PIN_DIRECT_APP_ID 0x0E
#define FEATURE_WRITE_DISPLAY            0x0F
#define FEATURE_GET_KEY                  0x10
#define FEATURE_IFD_DISPLAY_PROPERTIES   0x11
#define FEATURE_GET_TLV_PROPERTIES       0x12
#define FEATURE_CCID_ESC_COMMAND         0x13

#endif
