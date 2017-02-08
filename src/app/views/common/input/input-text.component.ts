import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Search} from "../../common/search";
import {LoadingController} from 'ionic-angular';
import {LoggerService} from "../../../services/logger/logger-service";
import {BarcodeScanner, Keyboard} from 'ionic-native';
import {BarcodeData} from "./barcode-data";
import {UtilService} from "../../../common/services/util.service";

@Component({
  selector: 'equipment-search',
  templateUrl: 'input-text.component.html'
})

export class InputTextComponent extends Search {
    @ViewChild('focusInput') myInput;

    pushNav: any;
    navTitle: string;
    hintText: string;
    prefix: string;
    aggregations: string;

    constructor(public navCtrl: NavController,
                public loadingCtrl: LoadingController,
                public navParams: NavParams,
                private log: LoggerService,
                private util: UtilService,
                public platform: Platform) {
        super(loadingCtrl);
    }

    ngOnInit() {
        // If we navigated to this page, we will have an item available as a nav param
        this.pushNav = this.navParams.get('pushNav');
        this.navTitle = this.navParams.get('navTitle');
        this.hintText = this.navParams.get('hintText');
        this.prefix = this.navParams.get('prefix');
        this.aggregations = this.navParams.get('aggregations');
    }

    ionViewDidLoad() {
        setTimeout(() => {
            this.myInput.setFocus();
            Keyboard.show();
        }, 500); // increased timeout from 150ms, seemed too short
    }

    public saveTheData(value: string) {
        let searchValue = this.prefix + "'" + value + "'";
        this.log.info('You entered (' + value + ', ' + searchValue + ', ' + this.aggregations + '), lets call: (' + this.navTitle + ', hintText=' + this.hintText + ')');

        // MAGIC - we receive the destination page as a parm that this page will "push", or navigate too, making this page a 'pass-thru' page acquiring user input
        this.navCtrl.push(this.pushNav, {
            navTitle: this.navTitle,
            hintText: this.hintText,
            searchValue: searchValue,
            aggregations: this.aggregations
        });
    }

    public barcodeScanClick(searchValue: string) {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.

            if (this.util.isMobility()) {
                BarcodeScanner.scan()
                    .then((result) => {
                        if (!result.cancelled) {
                            let barcodeData = new BarcodeData(result.text, result.format);
                            this.scanDetails(barcodeData);
                        }
                        else {
                            let message = 'Barcode Scan request Cancelled';
                            this.addLogMessage(message);
                        }
                    })
                    .catch((err) => {
                        let message = `Error => ${err}`;
                        //mec... growl everywhere?
                        this.logErrorMessage(message);
                    })
            }
            else {
                let barcodeData = new BarcodeData(searchValue, 'n/a');
                this.scanDetails(barcodeData);
            }
        });
    }

    scanDetails(details) {
        let message = 'You scanned (' + details.text + '), \nFormat = (' + details.format + ')';
        this.addLogMessage(message);
        //alert('mec...bag this alert\r\n' + message);
        this.saveTheData(details.text);
    }

    private addLogMessage(message: string) {
        this.log.info(message);
    }

    private logErrorMessage(error: string) {
        this.log.error(error);
    }

}
