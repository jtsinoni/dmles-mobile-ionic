import { Input, Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EquipmentRequestDetailsComponent } from './details/equip-request-details.component';
import { RequestApiService } from "../../../common/endpoints/request-api.service";
import { LoggerService } from "../../../services/logger/logger-service";
import { HostServerService } from "../../../services/host-server.service";
import { ServerModel } from "../../../models/server.model";
import {EquipReqTopicUpstreamService} from "../../../services/upstream/equip-req-topic-upstream.service";

@Component({
    selector: 'equipment-requests-page',
    templateUrl: './equipment-requests.component.html'
})

export class EquipmentRequestsComponent {
    selectedItem: any;

    @Input()
    items: Array<any>;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private RequestApiService: RequestApiService,
        private hostServerService: HostServerService,
        private upstreamService: EquipReqTopicUpstreamService,
        private log: LoggerService) {

    }

    ngOnInit() {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = this.navParams.get('item');
        this.getEquipmentRequests();

    }

    private getEquipmentRequests() {
        let server: ServerModel;
        this.hostServerService.getDefaultServer().then(s => server = s).then(() => {
            this.RequestApiService.setServer(server);
            this.RequestApiService.getEquipmentRequests()
                .map(results => results.json())
                .subscribe(
                (results) => {
                    this.items = results;
                    this.log.log(`results => ${JSON.stringify(results)}`);
                },
                (error) => {
                    this.log.error(`Error => ${error}`);
                });
        });
    }

    itemTapped(item) {
        this.navCtrl.push(EquipmentRequestDetailsComponent, {
            item: item
        });
    }
}
