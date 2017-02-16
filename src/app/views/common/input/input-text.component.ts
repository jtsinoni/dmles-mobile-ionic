import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform, ModalController, TextInput} from 'ionic-angular';
import {Search} from "../../common/search";
import {LoadingController} from 'ionic-angular';
import {LoggerService} from "../../../services/logger/logger-service";
import {BarcodeScanner, Keyboard} from 'ionic-native';
import {BarcodeData} from "./barcode-data";
import {UtilService} from "../../../common/services/util.service";
import {Level as LoggerLevel, Level} from "../../../services/logger/level";
import {GrowlDialogComponent} from "../dialogs/growl-dialog.component";

@Component({
  selector: 'input-text',
  templateUrl: 'input-text.component.html'
})

export class InputTextComponent extends Search {
    @ViewChild('focusInput') myInput; //: HTMLInputElement; or : TextInput;  // actually this is TextInput

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
                private platform: Platform) {
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

    ionViewDidEnter() { // NOTE: not as reliable: ionViewDidLoad()
        // display keyboard and set focus when we arrive
        this.platform.ready().then(() => {
            setTimeout(() => {
                Keyboard.show();
            }, 300); // increased timeout from 150ms, seemed too short

            setTimeout(() => {
                this.selectAll(this.myInput);
            }, 300); // increased timeout from 150ms, seemed too short
        });
    }

    ionViewDidLeave() {
        // close the keyboard when we leave
        this.platform.ready().then(() => {
            setTimeout(() => {
                Keyboard.close();
            }, 300); // increased timeout from 150ms, seemed too short
        });
    }

    public saveTheData(value: string) {
        let searchValue = this.prefix + "'" + value + "'";
        let message = '(' + value + ')';
        this.showGrowl(LoggerLevel.INFO, 'Entered: ', message);

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
                            let message = 'Scan request Cancelled';
                            this.showGrowl(LoggerLevel.INFO, 'Cancelled', message);
                        }
                    })
                    .catch((err) => {
                        let message = `Error => ${err}`;
                        this.showGrowl(LoggerLevel.ERROR, 'ERROR', message);
                    })
            }
            else {
                let barcodeData = new BarcodeData(searchValue, 'n/a');
                this.scanDetails(barcodeData);
            }
        });
    }

    public selectAll(field: TextInput) {
        field.setFocus(); // field._native.element().autofocus = true; // latter doesn't work
        // field._clearOnEdit = true; // WORKS kinda, but clears when user starts typing even though text is not highlighted

        if (field.value && field.value.length > 0) {
            //alert('mec...got field Name (' + field._componentName + '), Value=(' + field.value + '), Len=(' + field.value.length + '), Type=(' + field.type + ')');

            // MAGIC: this highlighted the field!
            field._native.element().setSelectionRange(0, field.value.length);

            // Would prefer to .select() or .setSelectionRange() rather than .clearTextInput() or the above ._clearOnEdit
            //field.select();
            //field.setSelectionRange(0, field.value.length);
            //field.clearTextInput();
        }
    }

    private scanDetails(details) {
        this.saveTheData(details.text);
    }

    public showGrowl(level: LoggerLevel, title, message, duration?: number, position?) {
        let icon: string = 'close';
        if (!duration) {
            switch (level) {
                // enter time in milliseconds
                case Level.ERROR:
                    duration = 10000;
                    icon = 'warning';
                    break;
                case Level.WARN:
                    duration = 6000;
                    icon = 'alert';
                    break;
                case Level.INFO:
                case Level.DEBUG:
                case Level.LOG:
                    duration = 3000;
                    icon = 'information-circle';
                    break;
                case Level.OFF:
                default:
                    duration = 3000;
                    icon = 'information-circle';
                    break;
            }
        }

        //Log all messages
        this.myLogger(level, 'Growl (' + message + ')');

        let errorModal = this.modalController.create(GrowlDialogComponent, {
            growlTitle: title,
            growlMessage: message,
            ttl: duration,
            iconName: icon
        });
        errorModal.present();
    }

    private myLogger(level: LoggerLevel, message: string) {
        switch (level) {
            case Level.ERROR:
                this.log.error(message);
                break;
            case Level.WARN:
                this.log.warn(message);
                break;
            case Level.INFO:
                this.log.info(message);
                break;
            case Level.DEBUG:
                this.log.debug(message);
                break;
            case Level.LOG:
                this.log.log(message);
                break;
            case Level.OFF:
            default:
                break;
        }

    }

}
