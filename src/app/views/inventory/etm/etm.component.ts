import { Component, Input, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
//import { Keyboard } from 'ionic-native';
import { Search } from "../../common/search";
import { LoadingController, ModalController, Modal } from 'ionic-angular';
import { LoggerService } from "../../../services/logger/logger-service";
import { ABiCatalogService } from "../../../common/endpoints/abi-catalog.service";
import { HostServerService } from "../../../services/host-server.service";
import { ServerModel } from "../../../models/server.model";
import { ABiCatalogResultModel } from "../../../models/abi-catalog-result.model";
import { ABiCatalogModel } from "../../../models/abi-catalog.model";
import { EtmDetailComponent } from "./etm-detail/etm-detail.component";
import { ABiTopicUpstreamService } from "../../../services/upstream/abi-topic-upstream.service";
import { BarcodeHelper } from "../../common/barcode-helper";
import { Focuser } from "../../../common/directives/focuser.directive";
import { ElementPositionDirective } from "../../../common/directives/element-position.directive";
import { SettingsService } from "../../../services/settings.service";
import { SettingsModel } from "../../../models/settings.model";
import { WarningDialogComponent } from "../../common/dialogs/warning-dialog.component";



@Component({
    selector: 'inventory-etm',
    templateUrl: './etm.component.html',
    providers: [BarcodeHelper]
})
export class EtmComponent extends Search {
    @Input()
    item: ABiCatalogResultModel;

    @ViewChild(ElementPositionDirective)
    posDirective: ElementPositionDirective;

    count: number;

    took: number = 0;

    modal: Modal;

    constructor(public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public barcodeHelper: BarcodeHelper,
        private upstreamService: ABiTopicUpstreamService,
        private abiCatalogService: ABiCatalogService,
        private hostServerService: HostServerService,
        private log: LoggerService,
        private modalController: ModalController,
        private settingsService: SettingsService,
        private platform: Platform) {
        super(loadingCtrl);
        this.item = new ABiCatalogResultModel();
        this.item.setDefaults();
    }

    ngOnInit() {

        let setting: SettingsModel;
        this.settingsService.getActionPositionSetting().then(s => setting = s).then(() => {

            if (setting) {
                let val = setting.setting.split(" ");
                if (val && val.length > 0) {
                    let topBottom = val[0];
                    let leftRight = val[1];
                    this.posDirective.setPosition(leftRight, topBottom);
                }
            }
        });

    }

    // ionViewDidEnter() {
    //     this.resetFocus();
    //
    // }

    public barcodeScan() {
        this.barcodeHelper.barcodeScan()
            .then((results) => {
                this.searchValue = results.text;
            })
            .catch((error) => {
                this.log.error(`${error}`);
            });
    }

    public storeBarcode() {
        this.barcodeHelper.storeBarcode(this.upstreamService);
    }

    public getSearchResults(searchValue: string) {
        this.item.setDefaults();
        this.log.debug('getting search results for value: ' + searchValue)
        this.showLoadingData({ content: `Searching for ${searchValue}` });
        let server: ServerModel;
        this.hostServerService.getDefaultServer().then(s => server = s).then(() => {
            this.abiCatalogService.setServer(server);
            this.abiCatalogService.getABiCatalogRecords(searchValue)
                .timeout(8000)
                .map(response => response.json())
                .subscribe(
                (response) => {
                    if (response) {
                        this.item.setResults(response.total, response.took, response.hits.fields);
                    }
                    this.loadingEnded();
                    this.item.resultReturned = true;
                },
                (error) => {
                    this.loadingEnded();
                    this.item.setDefaults();
                    this.item.resultReturned = true;
                    this.log.log(`Error => ${error}`);
                    let msg: String = "Error retrieving search results";
                    let errorModal = this.modalController.create(WarningDialogComponent, { txt: error, message: msg });
                    errorModal.present();
                });
        });
    }

    itemTapped(item: ABiCatalogModel) {
        this.presentModal(item);
    }

    public presentModal(item: ABiCatalogModel) {
        this.modal = this.modalController.create(EtmDetailComponent, { selected: item });
        this.modal.present();
    }

    public cancelModal() {
        this.modal.dismiss();
    }

    // private resetFocus() {
    //     this.platform.ready().then(() => {
    //         setTimeout(() => {
    //             Focuser.refocus();
    //         }, 800);
    //     });
    // }
}
