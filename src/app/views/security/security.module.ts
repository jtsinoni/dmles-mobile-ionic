import {NgModule} from "@angular/core";
import {IonicModule} from 'ionic-angular';
import {SecurityComponent} from "./security.component";

@NgModule({
    declarations: [SecurityComponent],
    imports: [IonicModule],
    exports: [SecurityComponent],
    entryComponents: [SecurityComponent],
})
export class SecurityModule {

}
