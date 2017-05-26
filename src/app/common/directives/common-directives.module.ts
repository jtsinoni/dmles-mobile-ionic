/**
 * Created by johntsinonis on 1/12/17.
 */
import {NgModule} from '@angular/core';
import {RemoveParentElementDirective} from './remove-parent-element.directive';
import {HeaderPageComponent} from "../../views/common/header/header-page.component";
import {AppMenuComponent} from "../../views/common/header/app-menu.component";
import {WarningDialogComponent} from "../../views/common/dialogs/warning-dialog.component";
import {GrowlDialogComponent} from "../../views/common/dialogs/growl-dialog.component";
import {Focuser} from "./focuser.directive";
import { ElementPositionDirective } from "./element-position.directive";

import {IonicModule} from "ionic-angular";
import {NavDrawerHeaderComponent} from "../../views/common/header/nav-drawer-header.component";
import {ModalHeaderComponent} from "../../views/common/header/modal-header.component";

@NgModule({
    declarations: [
        NavDrawerHeaderComponent,
        ModalHeaderComponent,
        HeaderPageComponent,
        RemoveParentElementDirective,
        AppMenuComponent,
        WarningDialogComponent,
        GrowlDialogComponent,
        Focuser,
        ElementPositionDirective
    ],
    imports: [IonicModule],
    exports: [
        NavDrawerHeaderComponent,
        ModalHeaderComponent,
        HeaderPageComponent,
        RemoveParentElementDirective,
        Focuser,
        ElementPositionDirective
    ],
    entryComponents: [
        AppMenuComponent,
        WarningDialogComponent,
        GrowlDialogComponent,
    ]
})

export class CommonDirectivesModule{}

