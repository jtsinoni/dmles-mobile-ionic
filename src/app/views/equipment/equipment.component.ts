import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {LoggerService} from "../../services/logger/logger-service";

import {AreaModel} from '../../models/area.model';
import {EquipmentRecordsComponent} from "./records/equipment-records.component";
import {EquipmentRequestsComponent} from "./requests/equipment-requests.component";
import {InputTextComponent} from "../common/input/input-text.component"; //mec... Added search criteria screen

@Component({
    selector: 'equipment-view',
    templateUrl: './equipment.component.html'
})

export class EquipmentComponent {
    areas = new Array<AreaModel>();

    constructor(public navCtrl: NavController, public log: LoggerService) {
        this.setAreas();
    }

    setAreas() {
        this.areas.push(new AreaModel('Equipment Requests', 'document', EquipmentRequestsComponent, 'light'));
        this.areas.push(new AreaModel('Equipment Records', 'cog', EquipmentRecordsComponent, 'gray'));
    }

    goTo(area: AreaModel) {
        if (area.title == 'Equipment Records') {
            let title = 'Search';
            let hintText = 'Equipment Record Search';
            let prefix = "searchValue=";
            let aggregations = "(deleteInd:N)";

            // mec: redirection through search.component to area.component, so, NOW area.component is passed to the callee, which will open that page (with the collected search criteria)
            this.navCtrl.push(InputTextComponent, {
                pushNav: area.component,
                navTitle: title,
                hintText: hintText,
                prefix: prefix,
                aggregations: aggregations
            });
        }
        else {
            this.navCtrl.push(area.component);
        }
    }

}
