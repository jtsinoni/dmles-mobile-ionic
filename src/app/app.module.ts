import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { HomeComponent } from './views/home/home.component';

import { DatabaseService } from './services/database.service';
import { FactoryUpstreamService } from './services/upstream/factory-upstream.service';
import { UpstreamService} from './services/upstream/upstream.service';

@NgModule({
    declarations: [
        MyApp,
        HelloIonicPage,
        ItemDetailsPage,
        ListPage,
        HomeComponent,
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HelloIonicPage,
        ItemDetailsPage,
        ListPage,
        HomeComponent,
    ],
    providers: [DatabaseService, FactoryUpstreamService]
})
export class AppModule {}
