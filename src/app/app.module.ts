import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {IonicApp, IonicModule} from 'ionic-angular';
import {Logger, Options as LoggerOptions, Level as LoggerLevel} from "angular2-logger/core";
import {DMLESMobile} from './app.component';

import {AppContainerComponent} from './app-container.component';
import {InventoryComponent} from './views/inventory/inventory.component';
import {SupplyComponent} from './views/supply/supply.component';
import {InventoryModule} from "./views/inventory/inventory.module";
import {SupplyModule} from "./views/supply/supply.module";
import {ServicesModule} from "./services/services.module";

import {EquipmentModule} from "./views/equipment/equipment.module";
import {TopicModule} from "./views/topic/topic.module";
import {CommonServicesModule} from "./common/services/common-services.module";
import {CommonEndpointsModule} from "./common/endpoints/common-endpoints.module";
import {AdminModule} from "./views/admin/admin.module";
import {LogViewerModule} from "./views/logs/log-viewer.module";

@NgModule({
    declarations: [
        DMLESMobile,
        AppContainerComponent,
    ],
    imports: [
        IonicModule.forRoot(DMLESMobile),
        CommonServicesModule.forRoot(),
        CommonEndpointsModule.forRoot(),
        TopicModule,
        InventoryModule,
        EquipmentModule,
        SupplyModule,
        HttpModule,
        AdminModule,
        ServicesModule,
        LogViewerModule,
        // CommonDirectivesModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        DMLESMobile,
        InventoryComponent,
        SupplyComponent,
        AppContainerComponent,
    ],
    providers: [
        Logger,
        { provide: LoggerOptions, useValue: { level: LoggerLevel.DEBUG } },
        //{ provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
