import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {Search} from "../../common/search";
import {BarcodeScannerService} from "../../../services/barcode-scanner.service";
import {LoggerService} from "../../../services/logger/logger-service";

@Component({
    selector: 'inventory-im-receipts',
    templateUrl: './im-receipts.component.html'
})
export class ImReceiptsComponent extends Search {

    constructor(public navCtrl: NavController,
                public loadingCtrl: LoadingController,
                private barcodeScannerService: BarcodeScannerService,
                private log: LoggerService) {
        super(loadingCtrl);
    }

    public barcodeScan() {
        this.barcodeScannerService.scan()
            .then((results) => {
                if(!results.cancelled) {
                    this.searchValue = results.text;
                    this.log.debug(`Barcode => ${results.text}, format => ${results.format}`);
                } else {
                    this.log.debug(`Scan request cancelled`);
                }
            })
            .catch((error) => {
                this.log.error(`${error}`);
            });
    }
}
