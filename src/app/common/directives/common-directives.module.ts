/**
 * Created by johntsinonis on 1/12/17.
 */
import {NgModule} from '@angular/core';
import {RemoveParentElementDirective} from './remove-parent-element.directive';
import {HeaderPageComponent} from "../../views/common/header/header-page.component";
import {AppMenuComponent} from "../../views/common/header/app-menu.component";
import {WarningDialogComponent} from "../../views/common/dialogs/warning-dialog.component";
import {HelpComponent} from "../../views/help/help.component";
import {SettingsComponent} from "../../views/settings/settings.component";

import {IonicModule} from "ionic-angular";
import {NavDrawerHeaderComponent} from "../../views/common/header/nav-drawer-header.component";

@NgModule({
    declarations: [NavDrawerHeaderComponent, HeaderPageComponent, RemoveParentElementDirective, AppMenuComponent, WarningDialogComponent,
    HelpComponent, SettingsComponent],
    imports: [IonicModule],
    exports: [NavDrawerHeaderComponent, HeaderPageComponent, RemoveParentElementDirective],
    entryComponents: [AppMenuComponent, WarningDialogComponent, HelpComponent, SettingsComponent]
})
export class CommonDirectivesModule{}
