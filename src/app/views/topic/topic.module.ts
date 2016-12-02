import {NgModule} from "@angular/core";
import {IonicModule} from 'ionic-angular';
import {TopicComponent} from "./topic.component";
import {StoreComponent} from "./store/store.component";
import {ForwardComponent} from "./forward/forward.component";
import {StartComponent} from "./start/start.component";

@NgModule({
    declarations: [TopicComponent, StartComponent, StoreComponent, ForwardComponent],
    imports: [IonicModule],
    exports: [TopicComponent],
})
export class TopicModule {

}
