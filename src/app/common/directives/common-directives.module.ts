/**
 * Created by johntsinonis on 1/12/17.
 */
import {NgModule} from '@angular/core';
import {RemoveParentElementDirective} from './remove-parent-element.directive';
import {HeaderPageComponent} from "../../views/common/header/header-page.component";
import {AppMenuComponent} from "../../views/common/header/app-menu.component";
import {WarningDialogComponent} from "../../views/common/dialogs/warning-dialog.component";
import {HelpComponent} from "../../views/help/help.component";

import {IonicModule} from "ionic-angular";

@NgModule({
    declarations: [HeaderPageComponent, RemoveParentElementDirective, AppMenuComponent, WarningDialogComponent, HelpComponent],
    imports: [IonicModule],
    exports: [HeaderPageComponent, RemoveParentElementDirective],
    entryComponents: [AppMenuComponent, WarningDialogComponent, HelpComponent]
})
export class CommonDirectivesModule{}
