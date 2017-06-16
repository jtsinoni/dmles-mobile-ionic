import {NgModule, Injector} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from "@angular/forms";
import {IonicApp, IonicModule} from 'ionic-angular';
import {BrowserModule} from '@angular/platform-browser';
import {DMLESMobile} from './app.component';

import {AppContainerComponent} from './app-container.component';
import {LoginComponent} from  './views/login/login.component';
import {BluetoothComponent} from  './views/bluetooth/bluetooth.component';
import {InventoryComponent} from './views/inventory/inventory.component';
import {SupplyComponent} from './views/supply/supply.component';
import {InventoryModule} from "./views/inventory/inventory.module";
import {SupplyModule} from "./views/supply/supply.module";
import {ServicesModule} from "./services/services.module";
import {SettingsModule} from './views/settings/settings.module'
import {HelpModule} from './views/help/help.module'

import {EquipmentModule} from "./views/equipment/equipment.module";
import {TopicModule} from "./views/topic/topic.module";
import {CommonServicesModule} from "./common/services/common-services.module";
import {CommonEndpointsModule} from "./common/endpoints/common-endpoints.module";
import {AdminModule} from "./views/admin/admin.module";
import {LogViewerModule} from "./views/logs/log-viewer.module";
import {CommonDirectivesModule} from "./common/directives/common-directives.module";

import {Options as LoggerOptions} from "./services/logger/options";
import {Level as LoggerLevel} from "./services/logger/level";
import {LoggerService} from "./services/logger/logger-service";
import {FileLoggerService} from "./services/logger/file-logger-service";
import {SecurityModule} from "./views/security/security.module";
import {LocalStorageModule} from "./services/local-storage/local-storage.module";
import {MenusModule} from "./views/menus/menus.module";
import {IonicPluginsModule} from "./common/plugins/ionic-plugins.module";

// Use AppInjector to get instance of service without constructor injection, because in some cases we don't want to
// inject the service on all of the derivative components.
//
// @see ../dmles-mobile-ionic/src/app/views/common/search.ts for example usage
export let AppInjector: Injector;

@NgModule({
    declarations: [
        DMLESMobile,
        AppContainerComponent,
        LoginComponent,
        BluetoothComponent,
    ],
    imports: [
        IonicModule.forRoot(DMLESMobile),
        CommonServicesModule.forRoot(),
        CommonEndpointsModule.forRoot(),
        LocalStorageModule.forRoot(),
        IonicPluginsModule.forRoot(),
        TopicModule,
        InventoryModule,
        EquipmentModule,
        SupplyModule,
        HttpModule,
        AdminModule,
        ServicesModule,
        LogViewerModule,
        CommonDirectivesModule,
        MenusModule,
        SecurityModule,
        FormsModule,
        SettingsModule,
        HelpModule,
        BrowserModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        DMLESMobile,
        InventoryComponent,
        SupplyComponent,
        AppContainerComponent,
        LoginComponent,
        BluetoothComponent,
    ],
    providers: [
        { provide: LoggerService, useClass: FileLoggerService },
        { provide: LoggerOptions, useValue: { level: LoggerLevel.DEBUG } },
        // //{ provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule {
    constructor(private injector: Injector) {
        AppInjector = this.injector;
    }
}
