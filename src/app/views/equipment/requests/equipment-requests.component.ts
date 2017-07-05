import {Input, Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {EquipmentRequestDetailsComponent} from './details/equip-request-details.component';
import {RequestApiService} from "../../../common/endpoints/request-api.service";
import {LoggerService} from "../../../services/logger/logger-service";
import {HostServerService} from "../../../services/host-server.service";
import {ServerModel} from "../../../models/server.model";
import {EquipReqTopicUpstreamService} from "../../../services/upstream/equip-req-topic-upstream.service";
import {WarningDialogComponent} from "../../common/dialogs/warning-dialog.component";
import {ModalDialogController} from "../../common/dialogs/modal-dialog-controller.component";

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
                .timeout(8000)
                .map((results) => {
                    if(results) {
                        return results.json()
                    }
                })
                .subscribe(
                (results) => {
                    if(results) {
                        this.items = results;
                        //this.log.log(`results => ${JSON.stringify(results)}`);
                    }
                },
                (error) => {
                    this.log.log(`Error => ${error}`);
                    let dialog = new ModalDialogController(WarningDialogComponent);
                    dialog.show({message: `Error retrieving equipment request search results.`, error: error});
                });
        });
    }

    itemTapped(item) {
        this.navCtrl.push(EquipmentRequestDetailsComponent, {
            item: item
        });
    }
}
