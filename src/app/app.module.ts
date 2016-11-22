import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { TopicComponent } from './views/topic/topic.component';

import { DatabaseService } from './services/database.service';
import { UpstreamService} from './services/upstream/upstream.service';
import {TopicUpstreamService} from "./services/upstream/topic-upstream.service";
import {CommonDataService} from "./services/common-data.service";
import {TopicMessagingService} from "./services/topic-messaging.service";
import {TopicModule} from "./views/topic/topic.module";

import {ConnectivityService} from "./services/connectivity.service";
import {SyncService} from "./services/sync.service";

@NgModule({
    declarations: [
        MyApp,
        HelloIonicPage,
        ItemDetailsPage,
        ListPage,
    ],
    imports: [
      IonicModule.forRoot(MyApp),
      TopicModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HelloIonicPage,
        ItemDetailsPage,
        ListPage,
        TopicComponent,
    ],
    providers: [TopicMessagingService, DatabaseService, SyncService,
                CommonDataService, ConnectivityService,
                { provide: UpstreamService, useClass: TopicUpstreamService }]
})
export class AppModule {}
