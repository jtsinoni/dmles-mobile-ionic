import {NgModule} from '@angular/core';
import {IonicModule} from "ionic-angular";
import {EtmMenuComponent} from "./etm-menu/etm-menu.component";
import {ImMenuComponent} from "./im-menu/im-menu.component";
import {StoredComponent} from "../stored/stored.component";
import {CommonDirectivesModule} from "../../common/directives/common-directives.module";
import {StoredDetailsComponent} from "../stored/details/stored-details.component";
import {EquipMenuComponent} from "./equip-menu/equip-menu.component";
import { ScannerMenuComponent } from "./scanner-menu/scanner-menu.component";

@NgModule({
    declarations: [
        EtmMenuComponent,
        ImMenuComponent,
        EquipMenuComponent,
        ScannerMenuComponent,
        StoredComponent,
        StoredDetailsComponent,
    ],
    imports: [IonicModule, CommonDirectivesModule],
    exports: [
        EtmMenuComponent,
        ImMenuComponent,
        EquipMenuComponent,
        ScannerMenuComponent,
        StoredComponent,
        StoredDetailsComponent,
    ],
    entryComponents: [
        EtmMenuComponent,
        ImMenuComponent,
        EquipMenuComponent,
        ScannerMenuComponent,
        StoredComponent,
        StoredDetailsComponent
    ]
})

export class MenusModule{}

