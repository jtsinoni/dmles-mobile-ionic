import {Component} from '@angular/core';
import {BluetoothModel} from "../../models/bluetooth.model";
import {Platform, ModalController, ViewController} from 'ionic-angular';
import {LoggerService} from "../../services/logger/logger-service";
import {GrowlDialogComponent} from "../common/dialogs/growl-dialog.component";
import {BluetoothSerial} from "ionic-native";
import {Level as LoggerLevel, Level} from "../../services/logger/level";

//mec... MENTION THIS:
// ionic plugin add cordova-plugin-bluetooth-serial
// > npm update
// NOT! cordova plugin add cordova-plugin-bluetooth-serial
// plugin name="cordova-plugin-bluetooth-serial" spec="~0.4.5"
//
// Methods
//   bluetoothSerial.isEnabled - reports if bluetooth is enabled
//   bluetoothSerial.enable - enables Bluetooth (Android only, silently fail for iOS???)
//   bluetoothSerial.list - lists "paired" Bluetooth devices (must manually pair these devices); use .showBluetoothSettings() to display Settings/Bluetooth
//   bluetoothSerial.showBluetoothSettings - displays the OS Settings / Bluetooth activity
//   maybe call this when desired device is not on 'list'
//   bluetoothSerial.isConnected - true if bluetooth is connected (to a particular device???)
//   bluetoothSerial.connect - connect to 'id' (mac or UUID)
//   bluetoothSerial.disconnect - disconnect current connection
//   bluetoothSerial.write - write data to serial port (which device??? connected device???)
//
// Not needed:
//   bluetoothSerial.setDiscoverable - makes the device discoverable to other devices (not sure we need this, maybe reach out to printer?)
//   bluetoothSerial.connectInsecure
//   bluetoothSerial.read
//   bluetoothSerial.readUntil
//   bluetoothSerial.subscribe
//   bluetoothSerial.unsubscribe
//   bluetoothSerial.subscribeRawData
//   bluetoothSerial.unsubscribeRawData
//   bluetoothSerial.clear
//   bluetoothSerial.available
//   bluetoothSerial.readRSSI
//   bluetoothSerial.setDeviceDiscoveredListener
//   bluetoothSerial.clearDeviceDiscoveredListener
//   bluetoothSerial.setName - sets name to broadcast to other devices for discovery, not needed???
//   bluetoothSerial.discoverUnpaired - Android only - don't use this, use .showBluetoothSettings() instead


@Component({
    selector: 'bluetooth',
    templateUrl: './bluetooth.component.html'
})

export class BluetoothComponent {
    bluetoothText: string;
    bluetoothModel: BluetoothModel;
    showEnableBluetoothButton: boolean = true;
    private bt: any; // local class instance, use this one
    private static _bt: any; // global statis, don't use this variable (the plugin BluetoothSerial class is a static class)

    constructor(private platform: Platform,
                private log: LoggerService,
                private modalController: ModalController,
                private viewController: ViewController) {
        this.bluetoothText = "Bluetooth";
        this.bluetoothModel = new BluetoothModel();

        BluetoothComponent._bt = BluetoothSerial;
        this.bt = BluetoothComponent._bt;
    }

    ionViewDidLoad() { // ionViewDidEnter() - recursion?
        this.refreshStatus();
    }

    public bluetooth(bluetoothModel: BluetoothModel) {
        let message = '';
        this.logInfoMessage('Bluetooth device name: ' + bluetoothModel.name);
        this.platform.ready()
            .then(() => {
                this.bt.showBluetoothSettings()
                    .then(() => {
                        this.logInfoMessage('Bluetooth settings successfully shown');
                    }, (err) => {
                        message = `Bluetooth Settings Unavailable Error => ${err}`;
                        this.showGrowl(LoggerLevel.ERROR, 'Error: ', message);
                    });
            })
            .catch((error) => {
                message = `Error => ${error}`;
                this.showGrowl(LoggerLevel.ERROR, 'Error: ', message);
            });

        // refresh our button status
        this.refreshStatus();
    }

    // Enable the Bluetooth service on device
    public enableBluetooth() {
        let message = '';
        this.platform.ready()
            .then(() => {
                this.refreshStatus();

                // Enable the bluetooth, regardless if the showEnableBluetoothButton state (we heard the event to enable)
                //if (!this.showEnableBluetoothButton) {
                this.bt.enable()
                    .then(() => {
                        this.logInfoMessage('Bluetooth successfully enabled');
                    }, (err) => {
                        message = `Bluetooth Enable Error => ${err}`;
                        this.showGrowl(LoggerLevel.ERROR, 'Error: ', message);
                    });
                //}
            })
            .catch((error) => {
                message = `Error => ${error}`;
                this.showGrowl(LoggerLevel.ERROR, 'Error: ', message);
            });

        // refresh our button status
        this.refreshStatus();
    }

    // refresh our button status
    private refreshStatus() {
        // NOTE: this check takes time, so we can't just return a boolean,
        this.platform.ready().then(() => {
            setTimeout(() => {
                // Don't growl here, as we refreshStatus frequently and this pop-up will get annoying (errors will be displayed by other bluetooth functions)
                this.bt.isEnabled()
                    .then(() => {
                        //this.showGrowl(Level.INFO, 'Bluetooth:', 'Successfully enabled');
                        this.showEnableBluetoothButton = false;
                    }, (err) => {
                        //this.showGrowl(Level.INFO, 'Bluetooth:', err);
                        this.showEnableBluetoothButton = true;
                    });
            }, 1000); // Question our timeout
        });
    }

    private logInfoMessage(message: string) {
        this.log.info(message);
    }

    cancel() {
        this.viewController.dismiss();
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
