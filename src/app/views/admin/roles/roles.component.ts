import {Component, Input} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {RoleDetailsComponent} from './details/role-details.component';
import {RoleService} from "../../../common/endpoints/role.service";

@Component({
    templateUrl: 'roles.component.html'
})

export class RolesComponent {
    selectedItem: any;
    icons: string[];

    @Input()
    items: Array<any>;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private RoleService: RoleService) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');

        // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
        //     'american-football', 'boat', 'bluetooth', 'build'];
        //
        // this.items = [];
        // for (let i = 1; i < 11; i++) {
        //     this.items.push({
        //         title: 'Equipment Request ' + i,
        //         note: 'This is Equipment Request #' + i,
        //         icon: this.icons[Math.floor(Math.random() * this.icons.length)]
        //     });
        // }
        this.getAllRoles();
    }

    private getAllRoles() {
        this.RoleService.getAllRoles()
            .map(results => results.json())
            .subscribe((results) => {
                this.items = results;
                // for(let result of results) {
                //     role = new Role(result);
                // }
                //this.logger.info(`getAllRoles => ${JSON.stringify(results)}`);
            });

        // this.OAuthService.get("getAllRoles")
        //     .map(results => results.json())
        //     .subscribe((results) => {
        //         this.logger.info(`getAllRoles => ${JSON.stringify(results)}`);
        //     })
    }

    itemTapped(event, item) {
        this.navCtrl.push(RoleDetailsComponent, {
            item: item
        });
    }
}
