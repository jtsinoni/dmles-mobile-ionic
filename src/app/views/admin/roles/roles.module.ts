import {NgModule} from "@angular/core";
import {IonicModule} from 'ionic-angular';
import {RoleDetailsComponent} from "./details/role-details.component";
import {RolesComponent} from "./roles.component";
import {CommonDirectivesModule} from "../../../common/directives/common-directives.module";

@NgModule({
    declarations: [RolesComponent, RoleDetailsComponent],
    imports: [IonicModule, CommonDirectivesModule],
    exports: [RolesComponent, RoleDetailsComponent],
    entryComponents: [RolesComponent, RoleDetailsComponent],
})
export class RolesModule {

}
