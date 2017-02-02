import {Component, Input} from "@angular/core";
import {LogViewerService} from "../../../services/log-viewer.service";
import {UtilService} from "../../../common/services/util.service";

@Component({
    selector: 'mb-header-page',
    templateUrl: './header-page.component.html',
})

export class HeaderPageComponent {

    @Input()
    public title: string;

    constructor(private logViewerService: LogViewerService,
                private utilService: UtilService) {
    }

    public viewLogs() {
        this.logViewerService.presentModal();
    }

    public showLogButton(): boolean {
        if(this.utilService.isProd()) {
            return false;
        }

        return (this.utilService.isMobility()) ? true : false;
    }

}
