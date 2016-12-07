import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { DMLESMobile } from './app.component';
import { TopicComponent } from './views/topic/topic.component';

import { DatabaseService } from './services/database.service';
import { UpstreamService} from './services/upstream/upstream.service';
import {TopicUpstreamService} from "./services/upstream/topic-upstream.service";
import {CommonDataService} from "./services/common-data.service";
import {TopicMessagingService} from "./services/topic-messaging.service";
import {TopicModule} from "./views/topic/topic.module";

import {NetworkService} from "./services/network.service";
import {EquipmentRecordsComponent} from "./views/equipment/records/equipment-records.component";
import {EquipmentRecordDetailsComponent} from "./views/equipment/records/details/equip-record-details.component";
import {EquipmentRequestsComponent} from "./views/equipment/requests/equipment-requests.component";
import {EquipmentRequestDetailsComponent} from "./views/equipment/requests/details/equip-request-details.component";

@NgModule({
    declarations: [
        DMLESMobile,
        EquipmentRecordsComponent,
        EquipmentRecordDetailsComponent,
        EquipmentRequestsComponent,
        EquipmentRequestDetailsComponent,

    ],
    imports: [
      IonicModule.forRoot(DMLESMobile),
      TopicModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        DMLESMobile,
        TopicComponent,
        EquipmentRecordsComponent,
        EquipmentRecordDetailsComponent,
        EquipmentRequestsComponent,
        EquipmentRequestDetailsComponent,
    ],
    providers: [TopicMessagingService, DatabaseService,
                CommonDataService, NetworkService,
                { provide: UpstreamService, useClass: TopicUpstreamService }]
})
export class AppModule {}
