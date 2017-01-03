/**
 * Created by johntsinonis on 11/29/16.
 */
export class StoreDataModel {
    badgeCount: number;
    disableConnectButton: boolean;
    disableDisconnectButton: boolean;
    isServiceAvailable: boolean;

    constructor() {
        this.badgeCount = 0;
        this.disableConnectButton = false;
        this.disableDisconnectButton = true;
        this.isServiceAvailable = false;

    }
}
