import {NgModule} from "@angular/core";
import {IonicModule} from 'ionic-angular';
import {TopicComponent} from "./topic.component";
import {StoreComponent} from "./store/store.component";
import {ForwardComponent} from "./forward/forward.component";
import {StartComponent} from "./start/start.component";
import {RemoveParentElementDirective} from "../../common/directives/remove-parent-element.directive";
import {HeaderPageComponent} from "../common/header/header-page.component";

@NgModule({
    declarations: [TopicComponent, StartComponent, StoreComponent, ForwardComponent, HeaderPageComponent, RemoveParentElementDirective],
    imports: [IonicModule],
    exports: [TopicComponent],
    entryComponents: [TopicComponent],
})
export class TopicModule {

}
