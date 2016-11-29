import {NgModule} from "@angular/core";
import {IonicModule} from 'ionic-angular';
import {TopicComponent} from "./topic.component";
import {StoreComponent} from "./store/store.component";
import {ForwardComponent} from "./forward/forward.component";

@NgModule({
    declarations: [TopicComponent, StoreComponent, ForwardComponent],
    imports: [IonicModule],
    exports: [TopicComponent],
})
export class TopicModule {

}
