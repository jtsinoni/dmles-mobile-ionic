import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SettingsComponent } from './settings.component';
import { AddSettingComponent } from './add-setting/add-setting.component';
import { SettingsDisplayComponent } from './settings-display.component';
import { CommonDirectivesModule } from "../../common/directives/common-directives.module";


@NgModule({
    declarations: [
        SettingsComponent,
        AddSettingComponent,
        SettingsDisplayComponent,

    ],
    imports: [IonicModule, CommonDirectivesModule],
    exports: [
        SettingsComponent,
        AddSettingComponent,
        SettingsDisplayComponent,
    ],
    entryComponents: [SettingsComponent, AddSettingComponent]
})
export class SettingsModule { }
