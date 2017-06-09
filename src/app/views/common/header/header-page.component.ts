import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";
//import { LogViewerService } from "../../../services/log-viewer.service";
import { UtilService } from "../../../common/services/util.service";
import {PopoverController} from 'ionic-angular';
import {CommonHeader} from "./common-header";

@Component({
    selector: 'mb-header-page',
    templateUrl: './header-page.component.html'
})

export class HeaderPageComponent extends CommonHeader {
    constructor(protected utilService: UtilService,
                protected popoverCtrl: PopoverController,
                protected viewController: ViewController) {
        super(utilService, popoverCtrl, viewController);
    }

}
