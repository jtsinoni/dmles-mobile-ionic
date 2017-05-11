import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SettingsComponent } from './settings.component';
import { AddSettingComponent } from './add-setting/add-setting.component';
import { ServerDisplayComponent } from './add-server/server-display.component';
import { CommonDirectivesModule } from "../../common/directives/common-directives.module";
import { AddServerComponent } from "./add-server/add-server.component";
import {CacSettingComponent} from "./cac/cac-setting.component";


@NgModule({
    declarations: [
        SettingsComponent,
        AddSettingComponent,
        ServerDisplayComponent,
        AddServerComponent,
        CacSettingComponent

    ],
    imports: [IonicModule, CommonDirectivesModule],
    exports: [
        SettingsComponent,
        AddSettingComponent,
        ServerDisplayComponent,
        AddServerComponent,
        CacSettingComponent
    ],
    entryComponents: [SettingsComponent, AddSettingComponent, AddServerComponent, CacSettingComponent]
})
export class SettingsModule { }
