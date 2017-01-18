import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {IonicApp, IonicModule} from 'ionic-angular';
import {DMLESMobile} from './app.component';

import {AppContainerComponent} from './app-container.component';
import {LoginComponent} from  './views/login/login.component';
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
import {CommonDirectivesModule} from "./common/directives/common-directives.module";

import {Options as LoggerOptions} from "./services/logger/options";
import {Level as LoggerLevel} from "./services/logger/level";
import {LoggerService} from "./services/logger/logger-service";
import {FileLoggerService} from "./services/logger/file-logger-service";

@NgModule({
    declarations: [
        DMLESMobile,
        AppContainerComponent,
        LoginComponent
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
        CommonDirectivesModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        DMLESMobile,
        InventoryComponent,
        SupplyComponent,
        AppContainerComponent,
        LoginComponent
    ],
    providers: [
        { provide: LoggerService, useClass: FileLoggerService },
        { provide: LoggerOptions, useValue: { level: LoggerLevel.DEBUG } },
        // //{ provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
