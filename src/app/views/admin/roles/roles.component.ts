import {Component, Input} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {RoleDetailsComponent} from './details/role-details.component';
import {RoleService} from "../../../common/endpoints/role.service";
import {LoggerService} from "../../../services/logger/logger-service";

@Component({
    templateUrl: './roles.component.html'
})

export class RolesComponent {
    selectedItem: any;

    @Input()
    items: Array<any>;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private RoleService: RoleService,
                private log: LoggerService) {

        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');

        this.getAllRoles();
    }

    private getAllRoles() {
        this.RoleService.getAllRoles()
            .map(results => results.json())
            .subscribe((results) => {
                this.items = results;
                this.log.info(`getAllRoles => ${JSON.stringify(results)}`);
            });

    }

    itemTapped(event, item) {
        this.navCtrl.push(RoleDetailsComponent, {
            item: item
        });
    }
}
