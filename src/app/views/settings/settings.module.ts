import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SettingsComponent } from './settings.component';
import { AddSettingComponent } from './add-setting/add-setting.component';
import { ServerDisplayComponent } from './add-server/server-display.component';
import { CommonDirectivesModule } from "../../common/directives/common-directives.module";
import { AddServerComponent } from "./add-server/add-server.component";
import {CacSettingComponent} from "./cac/cac-setting.component";
import {AppVersionSettingComponent} from "./app-version/app-version-setting.component";


@NgModule({
    declarations: [
        SettingsComponent,
        AddSettingComponent,
        ServerDisplayComponent,
        AddServerComponent,
        CacSettingComponent,
        AppVersionSettingComponent

    ],
    imports: [IonicModule, CommonDirectivesModule],
    exports: [
        SettingsComponent,
        AddSettingComponent,
        ServerDisplayComponent,
        AddServerComponent,
        CacSettingComponent,
        AppVersionSettingComponent
    ],
    entryComponents: [SettingsComponent, AddSettingComponent, AddServerComponent,
                      CacSettingComponent, AppVersionSettingComponent]
})
export class SettingsModule { }
