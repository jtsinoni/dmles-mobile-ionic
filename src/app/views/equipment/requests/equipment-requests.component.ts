import {Component, Input} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {EquipmentRequestDetailsComponent} from './details/equip-request-details.component';
import {RequestApiService} from "../../../common/endpoints/request-api.service";
import {Logger} from "angular2-logger/core";
import {RoleService} from "../../../common/endpoints/role.service";

@Component({
    templateUrl: 'equipment-requests.component.html'
})

export class EquipmentRequestsComponent {
    selectedItem: any;

    @Input()
    items: Array<any>;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private RequestApiService: RequestApiService,
                private RoleService: RoleService,
                private log: Logger) {
    }

    ngOnInit() {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = this.navParams.get('item');

        // Let's navigate from TabsPage to Page1
        this.getEquipmentRequests();
    }

    private getEquipmentRequests() {
        this.RequestApiService.getEquipmentRequests()
            .map(results => results.json())
            .subscribe((results) => {
                this.items = results;
                //console.log(`getAllRoles => ${JSON.stringify(results)}`);
            });

        // this.items = [];
        // for (let i = 1; i < 11; i++) {
        //     this.items.push({
        //         requestTitle: 'Equipment Request ' + i,
        //         totalPrice: 'This is Equipment Request #' + i,
        //     });
        // }
    }

    public getEquipRequests() {
        this.RequestApiService.getEquipmentRequests()
            .map((results) => {
                this.log.info(`results => ${results}`);
                //return results.json();
            })
            .subscribe(
                (token) => {
                    this.log.info(`OAuth Token => ${token}`);
                },
                (error) => {
                    this.log.error(`Error => ${error}`);
                },
                () => {
                    this.log.info(`Authentication Complete`);
                });

            //     (results) => {
            //     this.items = results;
            //     //console.log(`getAllRoles => ${JSON.stringify(results)}`);
            // });
    }

    public getAllRoles() {
        this.RoleService.getAllRoles()
            .map(results => results.json())
            .subscribe((results) => {
                //this.items = results;
                // for(let result of results) {
                //     role = new Role(result);
                // }
                this.log.info(`getAllRoles => ${results}`);
            });

        //     (results) => {
        //     this.items = results;
        //     //console.log(`getAllRoles => ${JSON.stringify(results)}`);
        // });
    }

    itemTapped(item) {
        this.navCtrl.push(EquipmentRequestDetailsComponent, {
            item: item
        });
    }
}
