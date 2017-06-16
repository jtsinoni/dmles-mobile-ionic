import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RoleDetailsComponent } from './details/role-details.component';
import { RoleService } from "../../../common/endpoints/role.service";
import { LoggerService } from "../../../services/logger/logger-service";
import { HostServerService } from "../../../services/host-server.service";
import { ServerModel } from "../../../models/server.model";


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
        private log: LoggerService,
        private hostServerService: HostServerService
    ) {

        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        this.getAllRoles();

    }

    private getAllRoles() {
        let server: ServerModel;
        this.hostServerService.getDefaultServer().then(s => server = s).then(() => {
            this.RoleService.setServer(server);
            this.RoleService.getAllRoles()
                .map(results => results.json())
                .subscribe((results) => {
                    this.items = results;
                    this.log.log(`getAllRoles => ${JSON.stringify(results)}`);
                });
        });
    }

    itemTapped(event, item) {
        this.navCtrl.push(RoleDetailsComponent, {
            item: item
        });
    }
}
