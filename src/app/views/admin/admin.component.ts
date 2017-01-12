import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {AreaModel} from '../../models/area.model';
import {RolesComponent} from "./roles/roles.component";

@Component({
    selector: 'admin-view',
    templateUrl: './admin.component.html'
})

export class AdminComponent {
    areas = new Array<AreaModel>();

    constructor(public navCtrl: NavController) {
        this.setAreas();
    }

    setAreas() {
        this.areas.push(new AreaModel('Roles', 'cog', RolesComponent, 'light'));
    }

    goTo(area: AreaModel) {
        this.navCtrl.push(area.component);
    }

}
