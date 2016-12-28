import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';

import {AreaModel} from '../../models/area.model';
import {EquipmentRecordsComponent} from "./records/equipment-records.component";
import {EquipmentRequestsComponent} from "./requests/equipment-requests.component";

@Component({
    selector: 'equipment-view',
    templateUrl: 'equipment.component.html'
})

export class EquipmentComponent {
    areas = new Array<AreaModel>();

    constructor(public navCtrl: NavController) {
        this.setAreas();
    }

    setAreas() {
        this.areas.push(new AreaModel('Equipment Requests', 'document', EquipmentRequestsComponent, 'light'));
        this.areas.push(new AreaModel('Equipment Records', 'cog', EquipmentRecordsComponent, 'gray'));
    }

    goTo(area: AreaModel) {
        this.navCtrl.push(area.component);
    }

}
