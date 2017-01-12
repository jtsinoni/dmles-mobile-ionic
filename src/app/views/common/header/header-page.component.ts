import {Component, Input, OnInit} from "@angular/core";
import {LogViewerService} from "../../../services/log-viewer.service";
import {UtilService} from "../../../common/services/util.service";

@Component({
    selector: 'mb-header-page',
    templateUrl: './header-page.component.html',
})

export class HeaderPageComponent implements OnInit {

    @Input()
    public title: string;

    @Input()
    public isMobility: boolean;

    constructor(private logViewerService: LogViewerService,
                private utilService: UtilService) {
    }

    ngOnInit(): void {
        this.isMobility = this.utilService.isMobility();
    }

    public viewLogs() {
        this.logViewerService.presentModal();
    }

}
