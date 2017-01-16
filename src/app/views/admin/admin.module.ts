import {NgModule} from "@angular/core";
import {IonicModule} from 'ionic-angular';

import {AdminComponent} from './admin.component';
import {RolesModule} from "./roles/roles.module";
import {CommonDirectivesModule} from "../../common/directives/common-directives.module";

@NgModule({
    declarations: [AdminComponent],
    imports: [IonicModule, RolesModule, CommonDirectivesModule],
    exports: [AdminComponent],
    entryComponents: [AdminComponent]
})
export class AdminModule {

}
