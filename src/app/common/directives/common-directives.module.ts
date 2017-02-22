/**
 * Created by johntsinonis on 1/12/17.
 */
import {NgModule} from '@angular/core';
import {RemoveParentElementDirective} from './remove-parent-element.directive';
import {HeaderPageComponent} from "../../views/common/header/header-page.component";
import {AppMenuComponent} from "../../views/common/header/app-menu.component";
import {WarningDialogComponent} from "../../views/common/dialogs/warning-dialog.component";
import {GrowlDialogComponent} from "../../views/common/dialogs/growl-dialog.component";
import {HelpComponent} from "../../views/help/help.component";
import {SettingsComponent} from "../../views/settings/settings.component";
import {AddSettingComponent} from "../../views/settings/add-setting/add-setting.component";

import {IonicModule} from "ionic-angular";
import {NavDrawerHeaderComponent} from "../../views/common/header/nav-drawer-header.component";

@NgModule({
    declarations: [NavDrawerHeaderComponent, HeaderPageComponent, RemoveParentElementDirective, AppMenuComponent, WarningDialogComponent, GrowlDialogComponent,
    HelpComponent, SettingsComponent, AddSettingComponent],
    imports: [IonicModule],
    exports: [NavDrawerHeaderComponent, HeaderPageComponent, RemoveParentElementDirective],
    entryComponents: [AppMenuComponent, WarningDialogComponent, GrowlDialogComponent, HelpComponent, SettingsComponent, AddSettingComponent]
})
export class CommonDirectivesModule{}
