import {NgModule, ModuleWithProviders} from "@angular/core";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {Network} from "@ionic-native/network";

@NgModule({
})
export class IonicPluginsModule {
    static forRoot():ModuleWithProviders {
        return {
            ngModule: IonicPluginsModule,
            providers: [BarcodeScanner, LocalNotifications, Network]
        };
    }

}
