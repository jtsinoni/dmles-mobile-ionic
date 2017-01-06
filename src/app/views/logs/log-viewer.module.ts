import {NgModule} from "@angular/core";
import {IonicModule} from 'ionic-angular';
import {LogsModalComponent} from "./modal/logs-modal.component";

@NgModule({
    declarations: [LogsModalComponent],
    imports: [IonicModule],
    exports: [LogsModalComponent],
    entryComponents: [LogsModalComponent],
})
export class LogViewerModule {

}
