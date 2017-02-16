import {NgModule} from "@angular/core";
import {IonicModule} from 'ionic-angular';
import {TopicComponent} from "./topic.component";
import {StoreComponent} from "./store/store.component";
import {ForwardComponent} from "./forward/forward.component";
import {CommonDirectivesModule} from "../../common/directives/common-directives.module";

@NgModule({
    declarations: [TopicComponent, StoreComponent, ForwardComponent],
    imports: [IonicModule, CommonDirectivesModule],
    exports: [TopicComponent],
    entryComponents: [TopicComponent],
})
export class TopicModule {

}
