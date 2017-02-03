import { Component, Input, OnInit } from "@angular/core";
//import { LogViewerService } from "../../../services/log-viewer.service";
import { UtilService } from "../../../common/services/util.service";
import { PopoverController } from 'ionic-angular';
import {AppMenuComponent} from './app-menu.component';



@Component({
    selector: 'mb-header-page',
    templateUrl: './header-page.component.html',
})

export class HeaderPageComponent implements OnInit {

    @Input()
    public title: string;

    @Input()
    public isMobility: boolean;

    constructor(private utilService: UtilService, private popoverCtrl: PopoverController) {
    }

    ngOnInit(): void {
        this.isMobility = this.utilService.isMobility();
    }

    // public viewLogs() {
    //     this.logViewerService.presentModal();
    // }

    showSettingsAreas() {
        let popover = this.popoverCtrl.create(AppMenuComponent);
        popover.present(AppMenuComponent);
    }
    

}
