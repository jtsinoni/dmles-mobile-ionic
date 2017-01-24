import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {LoggerService} from "../../services/logger/logger-service";

import {AreaModel} from '../../models/area.model';
import {EquipmentRecordsComponent} from "./records/equipment-records.component";
import {EquipmentRequestsComponent} from "./requests/equipment-requests.component";

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
            let enteredValue = "123"; //mec...yoyo... TODO bag HARDCODE...
            let searchValue = "searchValue='" + enteredValue + "'";
            let aggregations = "(deleteInd:N)";
            this.navCtrl.push(area.component, {searchValue: searchValue, aggregations: aggregations});
        }
        else {
            this.navCtrl.push(area.component);
        }
    }

}
