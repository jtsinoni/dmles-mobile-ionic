import {NgModule} from '@angular/core';
import {HttpModule} from "@angular/http";
import {IonicApp, IonicModule} from 'ionic-angular';
import {Logger, Options as LoggerOptions, Level as LoggerLevel} from "angular2-logger/core";
import {DMLESMobile} from './app.component';
import {TopicComponent} from './views/topic/topic.component';

import {DatabaseService} from './services/database.service';
import {UpstreamService} from './services/upstream/upstream.service';
import {TopicUpstreamService} from "./services/upstream/topic-upstream.service";
import {CommonDataService} from "./services/common-data.service";
import {TopicMessagingService} from "./services/topic-messaging.service";
import {TopicModule} from "./views/topic/topic.module";

import {NetworkService} from "./services/network.service";
import {EquipmentRecordsComponent} from "./views/equipment/records/equipment-records.component";
import {EquipmentRecordDetailsComponent} from "./views/equipment/records/details/equip-record-details.component";
import {EquipmentRequestsComponent} from "./views/equipment/requests/equipment-requests.component";
import {EquipmentRequestDetailsComponent} from "./views/equipment/requests/details/equip-request-details.component";
import {CommonServicesModule} from "./common/services/common-services.module";
import {CommonEndpointsModule} from "./common/endpoints/common-endpoints.module";
import {RolesComponent} from "./views/admin/roles/roles.component";
import {RoleDetailsComponent} from "./views/admin/roles/details/role-details.component";
import {RolesModule} from "./views/admin/roles/roles.module";

@NgModule({
    declarations: [
        DMLESMobile,
        EquipmentRecordsComponent,
        EquipmentRecordDetailsComponent,
        EquipmentRequestsComponent,
        EquipmentRequestDetailsComponent,
        // RolesComponent,
        // RoleDetailsComponent,

    ],
    imports: [
        IonicModule.forRoot(DMLESMobile),
        CommonServicesModule.forRoot(),
        CommonEndpointsModule.forRoot(),
        TopicModule,
        HttpModule,
        RolesModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        DMLESMobile,
        TopicComponent,
        EquipmentRecordsComponent,
        EquipmentRecordDetailsComponent,
        EquipmentRequestsComponent,
        EquipmentRequestDetailsComponent,
        RolesComponent,
        RoleDetailsComponent,
    ],
    providers: [TopicMessagingService, DatabaseService,
        CommonDataService, NetworkService,
        {provide: UpstreamService, useClass: TopicUpstreamService},
        Logger,
        { provide: LoggerOptions, useValue: { level: LoggerLevel.DEBUG } }]
})
export class AppModule {
}
