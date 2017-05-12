import {Injectable} from "@angular/core";

/**
 * Simple solution, works for IE10+.
 * More may be needed here.
 * Alternative if IE10+ is an issue:
 * Reference: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
 */
@Injectable()
export class Base64Service {

    constructor() {
    }

    /**
     * Creates a base-64 encoded ASCII string from a "string" of binary messagingDataModel.
     * @param str
     * @returns {string}
     */
    public b64EncodeUnicode(str:string){
        return btoa(str.trim());
    }

    /**
     * Decodes a string of messagingDataModel which has been encoded using base-64 encoding.
     * @param str
     * @returns {string}
     */
    public b64DecodeUnicode(str:string) {
        return atob(str);
    }
}
