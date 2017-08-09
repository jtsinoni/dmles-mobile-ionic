import {Component} from "@angular/core";
import {PopoverController, ViewController} from 'ionic-angular';
//import { LogViewerService } from "../../../services/log-viewer.service";
import {UtilService} from "../../../common/services/util.service";
import {CommonHeader} from "./common-header";

@Component({
    selector: 'mb-nav-drawer-header',
    templateUrl: './nav-drawer-header.component.html',
})

export class NavDrawerHeaderComponent extends CommonHeader {
    constructor(protected utilService: UtilService,
                protected popoverCtrl: PopoverController,
                protected viewController: ViewController) {
        super(utilService, popoverCtrl, viewController);
    }
}