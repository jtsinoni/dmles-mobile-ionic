import {Input, OnInit } from "@angular/core";
import {Tab, ViewController} from "ionic-angular";
//import { LogViewerService } from "../../../services/log-viewer.service";
import { UtilService } from "../../../common/services/util.service";
import {PopoverController} from 'ionic-angular';
import {AppMenuComponent} from './app-menu.component';
import {EtmMenuComponent} from "../../menus/etm-menu/etm-menu.component";
import {ImMenuComponent} from "../../menus/im-menu/im-menu.component";
import {EquipMenuComponent} from "../../menus/equip-menu/equip-menu.component";
import { ScannerMenuComponent } from "../../menus/scanner-menu/scanner-menu.component";  

export class CommonHeader implements OnInit {

    @Input()
    title: string;

    @Input()
    menu: any;

    @Input()
    isMobility: boolean;

    @Input()
    showSettings: boolean = true;

    // Registry of MenuComponents
    menuComponents: any = {
        'ImMenuComponent':ImMenuComponent, 
        'EtmMenuComponent':EtmMenuComponent, 
        'EquipMenuComponent':EquipMenuComponent,
        'ScannerMenuComponent': ScannerMenuComponent};

    constructor(protected utilService: UtilService,
                protected popoverCtrl: PopoverController,
                protected viewController: ViewController) {
    }

    ngOnInit(): void {
        this.isMobility = this.utilService.isMobility();
    }

    // public viewLogs() {
    //     this.logViewerService.presentModal();
    // }

    showSettingsAreas() {
        // default to AppMenuComponent
        let menuComponent: any = AppMenuComponent;

        // this.menu should be a string -- or even better yet a Component. However, in some cases we are using tabs in our HTML templates, it gets a bit tricky
        if(this.menu) {
            // TODO:  FIX -- a bit kludgy, just need to get menu component
            if(this.menu instanceof Tab && this.menu.rootParams) {
                menuComponent = this.menuComponents[this.menu.rootParams];
            } else {
                menuComponent = this.menuComponents[this.menu];
            }
        }

        let popover = this.popoverCtrl.create(menuComponent);
        popover.present(menuComponent);
    }


    cancel() {
        this.viewController.dismiss();
    }

}
