import {NgModule} from '@angular/core';
import {IonicModule} from "ionic-angular";
import {EtmMenuComponent} from "./etm-menu/etm-menu.component";
import {ImMenuComponent} from "./im-menu/im-menu.component";
import {StoredComponent} from "../stored/stored.component";
import {CommonDirectivesModule} from "../../common/directives/common-directives.module";
import {StoredDetailsComponent} from "../stored/details/stored-details.component";
import {EquipMenuComponent} from "./equip-menu/equip-menu.component";

@NgModule({
    declarations: [
        EtmMenuComponent,
        ImMenuComponent,
        EquipMenuComponent,
        StoredComponent,
        StoredDetailsComponent,
    ],
    imports: [IonicModule, CommonDirectivesModule],
    exports: [
        EtmMenuComponent,
        ImMenuComponent,
        EquipMenuComponent,
        StoredComponent,
        StoredDetailsComponent,
    ],
    entryComponents: [
        EtmMenuComponent,
        ImMenuComponent,
        EquipMenuComponent,
        StoredComponent,
        StoredDetailsComponent
    ]
})

export class MenusModule{}

