import {NgModule} from "@angular/core";
import {IonicModule} from 'ionic-angular';
import {RoleDetailsComponent} from "./details/role-details.component";
import {RolesComponent} from "./roles.component";

@NgModule({
    declarations: [RolesComponent, RoleDetailsComponent],
    imports: [IonicModule],
    exports: [RolesComponent, RoleDetailsComponent],
})
export class RolesModule {

}
