import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform, ModalController} from 'ionic-angular';
import {Search} from "../../common/search";
import {LoadingController} from 'ionic-angular';
import {LoggerService} from "../../../services/logger/logger-service";
import {BarcodeScanner, Keyboard} from 'ionic-native';
import {BarcodeData} from "./barcode-data";
import {UtilService} from "../../../common/services/util.service";
import {Level as LoggerLevel} from "../../../services/logger/level";
import {GrowlDialogComponent} from "../dialogs/growl-dialog.component";

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
                private modalController: ModalController,
                private util: UtilService,
                public platform: Platform) {
        super(loadingCtrl);
    }

    showGrowl(level: LoggerLevel, message, duration?: number, position?) {
        //mec...bobo...this.growl.presentGrowl(level, message, duration, position);
        this.showGrowlModal(message); //mec...bobo...
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
            Keyboard.show();
            //this.myInput.setFocus();
        }, 500); // increased timeout from 150ms, seemed too short

        setTimeout(() => {
            //Keyboard.show();
            this.myInput.setFocus();
        }, 500); // increased timeout from 150ms, seemed too short
    }

    public saveTheData(value: string) {
        let searchValue = this.prefix + "'" + value + "'";
        //let message = 'Entered (' + value + ', ' + searchValue + ', ' + this.aggregations + '), lets call: (' + this.navTitle + ', hintText=' + this.hintText + ')';
        let message = 'Entered (' + value + ')';
        this.showGrowl(LoggerLevel.INFO, message); //mec..., 3000, 'middle');

        //this.addLogDebugMessage(message);

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
                            // let message = 'Scanned (' + barcodeData.text + '), \nFormat = (' + barcodeData.format + ')';
                            // this.showGrowl(LoggerLevel.INFO, message); //mec..., 3000, 'middle');
                        }
                        else {
                            let message = 'Scan request Cancelled';
                            this.showGrowl(LoggerLevel.INFO, message); //mec..., 3000, 'middle');
                            //this.addLogDebugMessage(message);
                        }
                    })
                    .catch((err) => {
                        let message = `Error => ${err}`;
                        this.showGrowl(LoggerLevel.ERROR, message); //mec..., 3000, 'middle');
                    })
            }
            else {
                let barcodeData = new BarcodeData(searchValue, 'n/a');
                this.scanDetails(barcodeData);
            }
        });
    }

    private scanDetails(details) {
        // let message = 'Scanned (' + details.text + '), \nFormat = (' + details.format + ')';
        // this.showGrowl(LoggerLevel.INFO, message); //mec..., 3000, 'middle');

        this.saveTheData(details.text);
    }

    private showGrowlModal(message) {
        let errorModal = this.modalController.create(GrowlDialogComponent, {txt: message});
        errorModal.present();
    }

}
