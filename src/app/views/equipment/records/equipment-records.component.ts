import { Component, Input } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { LoggerService } from "../../../services/logger/logger-service";

import { EquipmentRecordDetailsComponent } from './details/equip-record-details.component';
import { RequestApiService } from "../../../common/endpoints/request-api.service";
import { HostServerService } from "../../../services/host-server.service";
import { ServerModel } from "../../../models/server.model";
import { WarningDialogComponent } from "../../common/dialogs/warning-dialog.component";


@Component({
    templateUrl: './equipment-records.component.html'
})

export class EquipmentRecordsComponent {
    selectedItem: any;
    searchValue: string;
    aggregations: string;

    @Input()
    items: Array<any>;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private RequestApiService: RequestApiService,
        private hostServerService: HostServerService,
        private log: LoggerService,
        private modalController: ModalController) {
    }

    ngOnInit() {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = this.navParams.get('item');
        this.searchValue = this.navParams.get('searchValue');
        this.aggregations = this.navParams.get('aggregations');
        this.getEquipmentRecords();


    }

    private getEquipmentRecords() {

        let server: ServerModel;
        this.hostServerService.getDefaultServer().then(s => server = s).then(() => {
            this.RequestApiService.setServer(server);

            this.log.debug('In getEquipmentRecords with (' + this.searchValue + ', ' + this.aggregations + ')');
            this.RequestApiService.getEquipmentRecords(this.searchValue, this.aggregations)
                .map(results => results.json())
                .subscribe(
                (results) => {
                    this.items = results.hits.hits; //mec: NOTE: MAGIC - We are 2 layers deep in results
                    this.log.debug(`results => ${JSON.stringify(results)}`);
                },
                (error) => {
                    let message = `Error => ${error}`;
                    this.log.error(message);
                    this.showErrorModal(message);
                });
        });
    }

    itemTapped(item) {
        this.navCtrl.push(EquipmentRecordDetailsComponent, {
            item: item
        });
    }

    private showErrorModal(error) {
        let msg = 'Connection Error';
        let errorModal = this.modalController.create(WarningDialogComponent, { txt: error, message: msg });
        errorModal.present();
    }

    private test(search: String) {
        alert(search);
    }

}
