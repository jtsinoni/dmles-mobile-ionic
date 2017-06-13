import { Component, ViewChild } from '@angular/core';
//import {Component, ViewChild} from '@angular/core';
import { NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { Search } from "../../common/search";
import { LoadingController } from 'ionic-angular';
import { LoggerService } from "../../../services/logger/logger-service";
import { BarcodeScanner, Keyboard } from 'ionic-native';
import { BarcodeData } from "./barcode-data";
import { UtilService } from "../../../common/services/util.service";
import { Level as LoggerLevel, Level } from "../../../services/logger/level";
import { GrowlDialogComponent } from "../dialogs/growl-dialog.component";
import { Focuser } from "../../../common/directives/focuser.directive";
import { ElementPositionDirective } from "../../../common/directives/element-position.directive";
import { SettingsService } from "../../../services/settings.service";
import { SettingsModel } from "../../../models/settings.model";


@Component({
    selector: 'input-text',
    templateUrl: 'input-text.component.html'

})

export class InputTextComponent extends Search {
    // NOTE: this is a working alternate approach for renderer
    //@ViewChild('focusInput') myInput; //: HTMLInputElement; or : TextInput;  // actually this is TextInput
    @ViewChild(ElementPositionDirective)
    posDirective: ElementPositionDirective;
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
        private platform: Platform,
        private settingsService: SettingsService) {
        super(loadingCtrl);
    }

    ngOnInit() {
        // If we navigated to this page, we will have an item available as a nav param
        this.pushNav = this.navParams.get('pushNav');
        this.navTitle = this.navParams.get('navTitle');
        this.hintText = this.navParams.get('hintText');
        this.prefix = this.navParams.get('prefix');
        this.aggregations = this.navParams.get('aggregations');
        let setting: SettingsModel;
        this.settingsService.getActionPositionSetting().then(s => setting = s).then(() => {

            if (setting) {
                let val = setting.setting.split(" ");
                if (val && val.length > 0) {
                    let topBottom = val[0];
                    let leftRight = val[1];                    
                    this.posDirective.setPosition(leftRight, topBottom);
                    this.log.debug('left right: ' + leftRight + 'top bottom: ' + topBottom);
                } 
            }
        });


    }

    ionViewDidEnter() { // NOTE: not as reliable: ionViewDidLoad()
        // display keyboard and set focus when we arrive
        this.platform.ready().then(() => {
            // iOS get => Although it works get warning: Showing keyboard not supported in iOS due to platform limitations.
            setTimeout(() => {
                Keyboard.show();
            }, 300); // increased timeout from 150ms, seemed too short

            setTimeout(() => {
                //this.selectAll(this.myInput); // NOTE: This is a working alternative to renderer, however renderer approach is preferred
                Focuser.refocus();
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
        let searchCriteria = this.prefix + "'" + value + "'";
        //let message = value;
        //this.showGrowl(LoggerLevel.INFO, 'Entered: ', message);

        // MAGIC - we receive the destination page as a parm that this page will "push", or navigate too, making this page a 'pass-thru' page acquiring user input
        this.navCtrl.push(this.pushNav, {
            navTitle: this.navTitle,
            hintText: this.hintText,
            searchValue: searchCriteria,
            aggregations: this.aggregations
        });
    }

    public barcodeScanClick(searchVal: string) {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.

            if (this.util.isMobility()) {
                // Camera barcode scan
                BarcodeScanner.scan()
                    .then((result) => {
                        if (!result.cancelled) {
                            let barcodeData: BarcodeData = new BarcodeData(result.text, result.format);

                            if (barcodeData) {
                                // TODO: should we use renderer approach via DOM two-way data bind, initially I used the renderer Focuser.setText() below, but it didn't update the DOM
                                // Without two-way data binding, the side effect was enter a value to search, then use camera to scan barcode, which worked, but even though the
                                // scanned value was put into the input textbox, but when regular non-camera, non-scanner input was input again (the search button selected),
                                // the OLD search value was used, hmmm
                                this.searchValue = result.text; //NOTE: MAGIC: This performs two-way data bind back to the DOM
                                searchVal = this.searchValue;

                                //Focuser.setText(result.text); // This approach did not update the DOM as advertised (bug in renderer?)

                                this.scanDetails(searchVal);
                            }
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
                this.scanDetails(searchVal);
            }
        });
    }

    // NOTE: This 'working' approach is manipulating the DOM directly and we switched to the renderer approach
    // public selectAll(field: TextInput) {
    //     field.setFocus(); // field._native.element().autofocus = true; // latter doesn't work
    //     // field._clearOnEdit = true; // WORKS kinda, but clears when user starts typing even though text is not highlighted
    //
    //     if (field.value && field.value.length > 0) {
    //         // MAGIC: this highlighted the field!
    //         field._native.element().setSelectionRange(0, field.value.length);
    //
    //         // Would prefer to .select() or .setSelectionRange() rather than .clearTextInput() or the above ._clearOnEdit
    //         //field.select();
    //         //field.setSelectionRange(0, field.value.length);
    //         //field.clearTextInput();
    //     }
    // }

    private scanDetails(scannedValue: string) {
        this.saveTheData(scannedValue);
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
