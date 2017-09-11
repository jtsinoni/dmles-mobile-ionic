import {NgModule, ModuleWithProviders} from "@angular/core";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {Network} from "@ionic-native/network";
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
//import {BluetoothSerial} from '@ionic-native/bluetooth-serial';
import {File} from '@ionic-native/file';
import {NativeStorage} from '@ionic-native/native-storage';
import {SecureStorage} from '@ionic-native/secure-storage';
//import {Keyboard} from '@ionic-native/keyboard';
import {AppVersion} from '@ionic-native/app-version';

@NgModule({
})
export class IonicPluginsModule {
    static forRoot():ModuleWithProviders {
        return {
            ngModule: IonicPluginsModule,
            providers: [BarcodeScanner, LocalNotifications, Network, StatusBar, SplashScreen,
                        File, NativeStorage, SecureStorage, AppVersion]
        };
    }
    // BluetoothSerial,Keyboard, 
}
