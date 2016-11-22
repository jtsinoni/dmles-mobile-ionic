import {NgModule} from "@angular/core";
import {IonicModule} from 'ionic-angular';
import {TopicComponent} from "./topic.component";
import {StoreComponent} from "./store/store.component";

@NgModule({
    declarations: [TopicComponent, StoreComponent],
    imports: [IonicModule],
    exports: [TopicComponent],
})
export class TopicModule {

}
