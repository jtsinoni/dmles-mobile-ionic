import {NgModule} from "@angular/core";
import {IonicModule} from 'ionic-angular';
import {ServerSelectorComponent} from "./server-selector.component";

@NgModule({
    declarations: [ServerSelectorComponent],
    imports: [IonicModule],
    exports: [ServerSelectorComponent],
    entryComponents: [ServerSelectorComponent],
})
export class ServerSelectorModule {

}
