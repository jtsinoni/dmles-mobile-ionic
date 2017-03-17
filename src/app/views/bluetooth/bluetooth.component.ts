import {Component} from '@angular/core';
import {BluetoothModel} from "../../models/bluetooth.model";
import {Platform, ModalController, ViewController} from 'ionic-angular';
import {LoggerService} from "../../services/logger/logger-service";
import {GrowlDialogComponent} from "../common/dialogs/growl-dialog.component";
import {BluetoothSerial} from "ionic-native";
import {Level as LoggerLevel, Level} from "../../services/logger/level";
import {GenerateBarcodeLabelService} from '../../services/generate-barcode-label.service';
import {Subscription} from "rxjs";
import {SettingsService} from '../../services/settings.service';
import {SettingsModel} from "../../models/settings.model";
import {AppConfigConstants} from "../../constants/app-config.constants";

// mec... TODO: fix the device error:
//     W PluginManager: THREAD WARNING: exec() call to BluetoothSerial.showBluetoothSettings blocked the main thread for 31ms. Plugin should use CordovaInterface.getThreadPool().


//mec... MENTION THIS:
// ionic plugin add cordova-plugin-bluetooth-serial --save    <- NOTE: This will update the config.xml and platform.json file as needed
// > cordova prepare
// > npm update
// NOT! cordova plugin add cordova-plugin-bluetooth-serial
// plugin name="cordova-plugin-bluetooth-serial" spec="~0.4.6"
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
    showEnableBluetoothButton: boolean = true;
    private bt: any; // local class instance, use this one
    myConnection: Subscription = null;
    selectedDevice: BluetoothModel = null;
    printStatus: boolean = false;
    selectedPrinter: string = "No printer";
    btPrinters: Array<BluetoothModel> = new Array<BluetoothModel>();
    settings: Array<SettingsModel> = new Array<SettingsModel>();

    constructor(private platform: Platform,
                private log: LoggerService,
                private settingService: SettingsService,
                private modalController: ModalController,
                private viewController: ViewController) {
        this.bluetoothText = "Bluetooth";

        this.bt = BluetoothSerial;
    }

    ionViewDidLoad() { // ionViewDidEnter() - recursion?
        this.refreshStatus();
        this.listBluetoothDevices();

        // snag the previous selected printer while we are here
        this.getSelectedPrinter();
    }

    // this method 'sets' the selected printer and stores into local user aettings and the class instance variable this.selectedPrinter
    // attempt to add the printer into user settings, this is usually done either if there is one and only one printer, or if user selects one from the available printers
    setSelectedPrinter(printer: string) {
        let message = "";
        let temp: SettingsModel = new SettingsModel(AppConfigConstants.printer.bluetoothBarcodeKey, printer, "");

        // unset the printer, in the case that we have an inappropriate one set
        this.selectedPrinter = "None";

        // Theory: We count number of barcode printers, delete all of them, recount them, then add the desired printer
        // HMMM... Really all we need to do is delete all, then add desired
        this.settingService.getBluetoothBarcodePrinterSettingsCount().then((s) => {
            this.settingService.deleteBluetoothBarcodePrinterSettings().then((s) => {
                this.settingService.add(temp).then(() => {
                    this.settingService.getBluetoothBarcodePrinterSettingsCount().then((s) => {
                        this.selectedPrinter = printer; // Save out printer into class instance variable
                    }).catch((error) => {
                        message = `Failed to recount Bluetooth Printer Setting, Error => ${error}`;
                        this.showGrowl(LoggerLevel.ERROR, 'Error: ', message);
                    });
                }).catch((error) => {
                    message = `Failed to add Bluetooth Printer Setting, Error => ${error}`;
                    this.showGrowl(LoggerLevel.ERROR, 'Error: ', message);
                });
            }).catch((error) => {
                message = `Failed to remove Bluetooth Printer Setting, Error => ${error}`;
                this.showGrowl(LoggerLevel.ERROR, 'Error: ', message);
            });
        }).catch((error) => {
            message = `Failed to count Bluetooth Printer Setting, Error => ${error}`;
            this.showGrowl(LoggerLevel.ERROR, 'Error: ', message);
        });
    }

    // this method retrieves the selected printer from local user settings and stores into the class instance variable this.selectedPrinter
    getSelectedPrinter() {
        let message = "";
        //let temp: SettingsModel = new SettingsModel(AppConfigConstants.printer.bluetoothBarcodeKey, "Zebra", "");

        this.settingService.getWhereUnindexed("settingName", AppConfigConstants.printer.bluetoothBarcodeKey).then((s) => {
            message = 'after getWhereUnindexed() (' + JSON.stringify(s) + ')'
            this.myLogger(Level.DEBUG, message);

            // unset the printer, in the case that we have an inappropriate one set
            this.selectedPrinter = "None";

            if (s.length == 1) {
                //walk this list (which is a list of 1) looking for 'where' with 'value'
                s.forEach((row) => {
                    message = 'FOUND (' + row.id + ',' + row.settingName + ',' + row.setting + ')';
                    this.myLogger(Level.DEBUG, message);
                    this.selectedPrinter = row.setting;
                    this.itemTapped(this.selectedPrinter); // note: this will set the .selectedDevice
                });
            }
            // either we have more than or less than 1, so attempt to delete them and leave this.selectPrinter UNSET
            else {
                this.settingService.deleteBluetoothBarcodePrinterSettings().then((s) => {
                    message = 'BluetoothBarcodePrinter settings DELETED (' + s + ')';
                    this.myLogger(Level.DEBUG, message);
                }).catch((error) => {
                    message = `Failed to remove Bluetooth Printer Setting, Error => ${error}`;
                    this.showGrowl(LoggerLevel.ERROR, 'Error: ', message);
                });
            }

        }).catch((error) => {
            message = `Failed to getWhereUnindexed(settingName, ` + AppConfigConstants.printer.bluetoothBarcodeKey + `), Error => ${error}`;
            this.showGrowl(LoggerLevel.ERROR, 'Error: ', message);
        });
    }

    public bluetooth() {
        let message = 'Show System Bluetooth Settings';
        this.myLogger(Level.INFO, message);
        this.platform.ready()
            .then(() => {
                this.bt.showBluetoothSettings()
                    .then(() => {
                        message = 'Bluetooth settings successfully shown';
                        this.myLogger(Level.INFO, message);
                    }, (err) => {
                        message = `Bluetooth Settings Unavailable Error => ${err}`;
                        this.showGrowl(LoggerLevel.ERROR, 'Error: ', message);
                    });
            })
            .catch((error) => {
                message = `System Bluetooth Access Error => ${error}`;
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
                        message = 'Bluetooth successfully enabled';
                        this.myLogger(Level.INFO, message);
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

    public listBluetoothDevices() {
        let message = 'List Bluetooth Devices';
        this.myLogger(Level.INFO, message);

        this.platform.ready()
            .then(() => {
                // List the "paired" Bluetooth devices
                this.bt.list()
                    .then((devices) => {
                        let count: number = 0;
                        let tempDevice: BluetoothModel = null;

                        // load up all of the 'paired' devices
                        devices.forEach((device) => {
                            count++;
                            message = 'Found Paired Device: (' + device.name + ', ' + device.id + ')';
                            this.myLogger(Level.INFO, message);

                            tempDevice = device;

                            // check to see is we already have our device in our btPrinter list
                            let inx: number = 0;
                            let found: boolean = false;
                            for (inx = 0; this.btPrinters.length > inx; inx++) {
                                if (this.btPrinters[inx].name === tempDevice.name) {
                                    found = true;
                                    break;
                                }
                            }

                            // Add the device to our list (if it is not already in our list)
                            if (!found) {
                                this.btPrinters.push(new BluetoothModel(tempDevice.class, tempDevice.id, tempDevice.address, tempDevice.name));
                            }
                        });

                        // We found our one (and only) device, let's set it to the default
                        if (count == 1) {
                            if (tempDevice) {
                                this.selectedDevice = tempDevice;
                                this.setSelectedPrinter(this.selectedDevice.name); // note this sets this.selectedPrinter globally
                                message = 'Using one and only Paired Device: (' + this.selectedPrinter + ', ' + this.selectedDevice.id + ')';
                                this.myLogger(Level.INFO, message);
                            }
                        }
                        else if (count > 1) {
                            // //mec... TODO: fix... need to account for a DEFAULT printer in the 'User Settings' (see Pauls routine)
                            // message = 'We have more than one printer, lets use the DEFAULT printer (if there is one). If there is NO default printer, then the user will need to select one';
                            // this.showGrowl(LoggerLevel.ERROR, 'Error: ', message);
                        }
                        //mec... TODO: We need to check to see if our 'saved' (this.selectedPrinter) is in THIS list - if not remove it

                        message = 'Paired Bluetooth devices successfully listed';
                        this.myLogger(Level.INFO, message);
                    }, (err) => {
                        message = `List Paired Bluetooth Devices Error => ${err}`;
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

    public printTestLabel() {
        let message = "";

        let device = this.selectedDevice;
        //TESTING Windows: device = new BluetoothModel('class_mec...','id_mec...','address_mec...','Zebra');

        let labelContent: Array<string> = [];
        labelContent.push('[ECN:012345 Org ID:ABCDEF]');
        labelContent.push('[Org Name:MIKE AA ARMY ME]');
        labelContent.push('[Item ID: SAMPLE label 12]');
        labelContent.push('[Nomen:               ABC]');
        labelContent.push(GenerateBarcodeLabelService.BARCODE_SYMBOL + '012345 ABCDEF');
        labelContent.push('   012345 ABCDEF   ');

        if (device != null) {
            let theLabel = GenerateBarcodeLabelService.makeBarcodeLabel(this.log, device, 1, labelContent);
            this.printLabel(device, theLabel);
        }
        else {
            message = `Target printer has not been selected`;
            this.showGrowl(LoggerLevel.ERROR, 'Error: ', message);
        }
    }

    public printLabel(device, theLabel) {
        let message = '';

        if (device != null) {
            this.platform.ready()
                .then(() => {
                    message = 'Connect to: (' + device.name + ', ' + device.id + ')';
                    this.myLogger(Level.INFO, message);

                    // Print to selected device, but let's connect first
                    this.btConnect(device)
                        .then(() => {
                            message = 'Print to: (' + device.name + ', ' + device.id + ')';
                            this.myLogger(Level.INFO, message);

                            this.printStatus = this.btPrint(device, theLabel);
                            //mec...TODO: react to success/failure of print? (maybe put put status on page?)
                        })
                        .catch((err) => {
                            message = `Print Label Error => ${err}`;
                            this.showGrowl(LoggerLevel.ERROR, 'Error: ', message);
                        });
                })
                .catch((error) => {
                    message = `Print Label Error => ${error}`;
                    this.showGrowl(LoggerLevel.ERROR, 'Error: ', message);
                });
        }
        else {
            message = `Target printer has not been selected`;
            this.showGrowl(LoggerLevel.ERROR, 'Error: ', message);
        }

        // refresh our button status
        this.refreshStatus();
    }

    public btConnect(device: any): Promise<any> {
        let message: string = '';

        // Check if we already connected before connecting
        return (new Promise((resolve, reject) => {
            this.bt.isConnected()
                .then(() => {
                    //alert('already connected to (' + device.name + ')');
                    message = 'already connected to (' + device.name + ')';
                    this.myLogger(Level.INFO, message);
                    resolve(message); //mec... TODO: Consider what to 'resolve'???
                })
                .catch((err) => { // Not really an error, but we are not connected.
                        message = 'Not connected, lets attempt to connect to (' + device.name + ') (' + err + ')';
                        this.myLogger(Level.INFO, message);

                        // NOTE: This is a long running process, so let's wait
                        // Added timeout to Account for Bluetooth Plugin BUG: BluetoothSerialService: disconnected --- BluetoothSerialService: java.io.IOException: bt socket closed, read return: -1
                        setTimeout(() => {
                            // Attempt to connect - the MAGIC to disconnect is that we save the Observable (Subscription) so we can 'unsubscribe' later
                            this.myConnection = this.bt.connect(device.id)
                                .subscribe(
                                    (resp) => {
                                        message = 'Printer (' + device.name + ') Connection (' + resp + ')';
                                        this.myLogger(Level.INFO, message);
                                        resolve(resp);
                                    },
                                    (error) => {
                                        message = `Printer (` + device.name + `) Connection Error => ${error}`;
                                        this.myLogger(Level.ERROR, message);
                                        reject(error);
                                    });
                        }, 250); //mec... Question our timeout, maybe use async await?
                    }
                )
        }))
    }

    public btDisconnect(device: any): Promise<any> {

        // Check if we already disconnected before disconnecting
        return (new Promise((resolve, reject) => {

            // BUG: .disconnect() does not work, but Subscription.unsubscribe() does!
            this.bt.isConnected()
                .then(() => {
                    let message = 'Am connected, attempt to disconnect from Printer (' + device.name + ')';
                    this.myLogger(Level.INFO, message);

                    try {

                        // Added throttling to Account for Bluetooth Plugin BUG: BluetoothSerialService: disconnected --- BluetoothSerialService: java.io.IOException: bt socket closed, read return: -1
                        setTimeout(() => {
                            // MAGIC how to disconnect (Subscription.unsubscribe())
                            this.myConnection.unsubscribe();
                        }, 250); //mec... Question our timeout, maybe use async await?
                        message = 'Successful disconnect from Printer (' + device.name + ')';
                        this.myLogger(Level.INFO, message);
                    }
                    catch (e) {
                        message = 'Error disconnecting from Printer (' + device.name + ') (' + e + ')';
                        this.myLogger(Level.ERROR, message);
                        resolve(message); // mec... TODO: Reconsider what to resolve
                    }
                })
                .catch((err) => { // Not really an error, but we are not connected, so we don't need to disconnect.
                    let message = 'Already disconnected from Printer (' + device.name + ') (' + err + ')';
                    this.myLogger(Level.ERROR, message);
                    resolve(message); // mec... TODO: Reconsider what to resolve
                })
        }));
    }


    public btPrint(device: any, data: any): boolean {
        let success: boolean = false;
        let message = 'Attempt to Print to: (' + device.name + ', ' + device.id + ') (' + data + ')'
        this.myLogger(Level.INFO, message);

        // NOTE: This is a long running process, so let's wait
        // Added timeout to Account for Bluetooth Plugin BUG: BluetoothSerialService: disconnected --- BluetoothSerialService: java.io.IOException: bt socket closed, read return: -1
        setTimeout(() => {
            this.bt.write(data)
                .then(() => {
                    success = true;
                    message = 'Successful Print to: (' + device.name + ', ' + device.id + ') (' + data + ')';
                    this.myLogger(Level.INFO, message);

                    // attempt to disconnect after successful print - THEORY: This disconnect only works here because we only connect when we ATTEMPT to print
                    this.btDisconnect(device);
                }, (err) => {
                    this.showGrowl(Level.ERROR, 'Label Printing Error: ', err);

                    // attempt to disconnect after UNsuccessful print - THEORY: This disconnect only works here because we only connect when we ATTEMPT to print
                    this.btDisconnect(device);
                });
        }, 100); //mec... Question our timeout, maybe use async await?

        return (success);
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

    isMsie(): boolean {
        let rc: boolean = false;

        let ua = window.navigator.userAgent;
        let dotnet = ua.indexOf(".NET");
        let msie = ua.indexOf("MSIE");

        // If Internet Explorer, return true
        if (dotnet >= 0 || msie >= 0) {
            rc = true;
        }

        return (rc);
    }

    itemTapped(itemName) {
        this.selectedPrinter = itemName;

        // check to see is we already have our device in our btPrinter list
        let inx: number = 0;
        for (inx = 0; this.btPrinters.length > inx; inx++) {
            if (this.btPrinters[inx].name === itemName) {
                this.selectedDevice = this.btPrinters[inx];
                this.setSelectedPrinter(this.selectedPrinter); // note this sets this.selectedPrinter globally
                break;
            }
        }

    }

    cancel() {
        this.viewController.dismiss();
    }

    private showGrowl(level: LoggerLevel, title, message, duration?: number, position?) {
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
        //alert('mec...' + message);
    }

}
