import {Injectable} from "@angular/core";
import {Platform} from "ionic-angular";
import {BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner';
import {LoggerService} from "./logger/logger-service";

@Injectable()
export class BarcodeScannerService {
    private serviceName = "BarcodeScanner Service";

    constructor(private log: LoggerService,
                private barcodeScanner: BarcodeScanner,
                private platform: Platform) {
        this.init();
    }

    private init() {
        this.platform.ready()
            .then(() => {
                this.log.debug(`${this.serviceName} - Start`);
            })
            .catch((error) => {
                this.log.error(`${error}`);
            });
    }

    /**
     *
     * @param options
     * @returns {Promise<any>}
     * Returns a Promise that resolves with scanner data, or rejects with an error.
     */
    public scan(options?: BarcodeScannerOptions): Promise<any> {
        return this.barcodeScanner.scan(options);
    }

    /**
     *
     * @param type
     * Types:
     * TEXT_TYPE: 'TEXT_TYPE',
     * EMAIL_TYPE: 'EMAIL_TYPE',
     * PHONE_TYPE: 'PHONE_TYPE',
     * SMS_TYPE: 'SMS_TYPE'
     *
     * @param data
     * Could be anything i.e an URL:  http://www.nytimes.com or just a name i.e. John Smith
     *
     * @returns {Promise<any>}
     */
    public encode(type: string, data: any): Promise<any> {
        return this.barcodeScanner.encode(type, data);
    }
}
