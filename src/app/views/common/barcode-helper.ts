import {BarcodeScannerService} from "../../services/barcode-scanner.service";
import {LoggerService} from "../../services/logger/logger-service";
import {TopicUpstreamService} from "../../services/upstream/topic-upstream.service";
import {BaseDatabaseService} from "../../services/database/base-database.service";
import {BaseDataTableModel} from "../../models/base-data-table.model";
import {AlertController} from "ionic-angular";
import {AppInjector} from "../../app.module";
export class BarcodeHelper {
    private barcodeScannerService: BarcodeScannerService;
    private alertController: AlertController;
    private log: LoggerService;

    barcodeResults: any;

    constructor() {
        this.barcodeScannerService = AppInjector.get(BarcodeScannerService);
        this.alertController = AppInjector.get(AlertController);
        this.log = AppInjector.get(LoggerService);
    }

    public barcodeScan(): Promise<any> {
        return this.barcodeScannerService.scan()
            .then((results) => {
                this.barcodeResults = results;

                if (!results.cancelled) {
                    this.log.debug(`Barcode => ${results.text}, format => ${results.format}`);
                } else {
                    this.log.debug(`Scan request cancelled`);
                }

                return results;
            })
            .catch((error) => {
                this.log.error(`${error}`);
            });
    }

    public storeBarcode<D extends BaseDatabaseService<BaseDataTableModel>>(upstreamService: TopicUpstreamService<D>) {
        if (this.barcodeResults != null) {
            upstreamService.sendData(this.barcodeResults)
                .then((result) => {
                    let message = `Stored barcode data to cache, barcode => ${this.barcodeResults.text}, format => ${this.barcodeResults.format}`;
                    this.log.debug(`${message}`);

                    this.showAlert("", message);
                })
                .catch((error) => {
                    this.log.error(`${error}`);
                });
        } else {
            this.log.warn("No barcode data provided.");
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
