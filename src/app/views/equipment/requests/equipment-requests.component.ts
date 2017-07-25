import {Input, Component} from '@angular/core';
import {NavController, NavParams, Loading, LoadingController} from 'ionic-angular';

import {EquipmentRequestDetailsComponent} from './details/equip-request-details.component';
import {RequestApiService} from "../../../common/endpoints/request-api.service";
import {LoggerService} from "../../../services/logger/logger-service";
import {HostServerService} from "../../../services/host-server.service";
import {ServerModel} from "../../../models/server.model";
import {EquipReqTopicUpstreamService} from "../../../services/upstream/equip-req-topic-upstream.service";
import {WarningDialogComponent} from "../../common/dialogs/warning-dialog.component";
import {ModalDialogController} from "../../common/dialogs/modal-dialog-controller.component";
import {UtilService} from "../../../common/services/util.service";

@Component({
    selector: 'equipment-requests-page',
    templateUrl: './equipment-requests.component.html'
})

export class EquipmentRequestsComponent {
    private loader: Loading;

    selectedItem: any;

    @Input()
    items: Array<any>;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private RequestApiService: RequestApiService,
        private hostServerService: HostServerService,
        private upstreamService: EquipReqTopicUpstreamService,
        private log: LoggerService,
        private utilService: UtilService,
        private loadingCtrl: LoadingController) {
    }

    ngOnInit() {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = this.navParams.get('item');
        this.getEquipmentRequests();
    }

    private getEquipmentRequests() {
        let server: ServerModel;
        this.hostServerService.getDefaultServer().then(s => server = s).then(() => {
            this.showLoadingData({content: `Getting Equipment Request ...`});

            this.RequestApiService.setServer(server);
            this.RequestApiService.getEquipmentRequests()
                .timeout(8000)
                .map((response) => {
                    return this.utilService.getPayload(response);
                })
                .subscribe(
                (results) => {
                    if(results) {
                        this.items = results;
                        //this.log.log(`results => ${JSON.stringify(results)}`);

                        this.loadingEnded();
                    }
                },
                (error) => {
                    this.loadingEnded();

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

    private showLoadingData(args: any) {
        let params = {content: args.content} as any;

        if(args.duration) {
            params.duration = args.duration;
        }

        this.loader = this.loadingCtrl.create(params);
        this.loader.present();
    }

    private loadingEnded() {
        this.loader.dismiss();
    }
}
