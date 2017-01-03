import {NgModule} from "@angular/core";
import {IonicModule} from 'ionic-angular';

import {AdminComponent} from './admin.component';
import {RolesModule} from "./roles/roles.module";

@NgModule({
    declarations: [AdminComponent],
    imports: [IonicModule, RolesModule],
    exports: [AdminComponent],
    entryComponents: [AdminComponent]
})
export class AdminModule {

}
