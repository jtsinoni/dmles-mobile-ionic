import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { DMLESMobile } from './app.component';
import { TopicComponent } from './views/topic/topic.component';
import { InventoryComponent } from './views/inventory/inventory.component';
import { SupplyComponent } from './views/supply/supply.component';
import { EquipmentComponent } from "./views/equipment/equipment.component";

import { DatabaseService } from './services/database.service';
import { UpstreamService } from './services/upstream/upstream.service';
import { TopicUpstreamService } from "./services/upstream/topic-upstream.service";
import { CommonDataService } from "./services/common-data.service";
import { TopicMessagingService } from "./services/topic-messaging.service";
import { NetworkService } from "./services/network.service";


import { TopicModule } from "./views/topic/topic.module";
import { InventoryModule } from "./views/inventory/inventory.module";
import { EquipmentModule } from "./views/equipment/equipment.module";
import { SupplyModule } from "./views/supply/supply.module";
import { ServicesModule } from "./services/services.module";

import { AppContainerComponent } from './app-container.component';

import { HttpModule } from '@angular/http';

@NgModule({
    declarations: [
        DMLESMobile,
        AppContainerComponent

    ],
    imports: [
        IonicModule.forRoot(DMLESMobile),
        TopicModule,
        InventoryModule,
        EquipmentModule,
        SupplyModule,
        HttpModule,
        ServicesModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        DMLESMobile,
        TopicComponent,
        InventoryComponent,
        EquipmentComponent,
        SupplyComponent,
        AppContainerComponent
    ],
    providers: [
        TopicMessagingService, DatabaseService,
        CommonDataService, NetworkService,
        { provide: UpstreamService, useClass: TopicUpstreamService },
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
