import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {Search} from "../../common/search";
import {BarcodeScannerService} from "../../../services/barcode-scanner.service";
import {LoggerService} from "../../../services/logger/logger-service";
import {IMTopicUpstreamService} from "../../../services/upstream/im-topic-upstream.service";

@Component({
    selector: 'inventory-im-receipts',
    templateUrl: './im-receipts.component.html',
})
export class ImReceiptsComponent extends Search {
    private barcodeResults: any;

    constructor(public navCtrl: NavController,
                public loadingCtrl: LoadingController,
                public alertController: AlertController,
                private barcodeScannerService: BarcodeScannerService,
                private upstreamService: IMTopicUpstreamService,
                private log: LoggerService) {
        super(loadingCtrl);
    }

    public barcodeScan() {
        this.barcodeScannerService.scan()
            .then((results) => {
                this.barcodeResults = results;

                if (!results.cancelled) {
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

    public storeBarcode() {
        if (this.barcodeResults != null) {
            this.upstreamService.sendData(this.barcodeResults)
                .then((result) => {
                    let message = `Stored barcode data to cache => Barcode => ${this.barcodeResults.text}, format => ${this.barcodeResults.format}`;
                    this.log.debug(`${message}`);

                    this.showAlert("", message);
                })
                .catch((error) => {
                    this.log.error(`${error}`);
                });
        }
    }

    private showAlert(title: string, subTitle: string) {
        let alert = this.alertController.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
    }
}
