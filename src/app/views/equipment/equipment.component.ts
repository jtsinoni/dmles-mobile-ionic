import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {LoggerService} from "../../services/logger/logger-service";

import {AreaModel} from '../../models/area.model';
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
    }

    goTo(area: AreaModel) {
        this.navCtrl.push(area.component);
    }

}
