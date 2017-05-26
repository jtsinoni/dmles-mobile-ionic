import {Component, Input, ViewChild} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {Search} from "../../common/search";
import {LoadingController, ModalController, Modal} from 'ionic-angular';
import {LoggerService} from "../../../services/logger/logger-service";
import {ABiCatalogService} from "../../../common/endpoints/abi-catalog.service";
import {HostServerService} from "../../../services/host-server.service";
import {ServerModel} from "../../../models/server.model";
//import { ABiCatalogResultModel } from "../../../models/abi-catalog-result.model";
import {ABiCatalogModel} from "../../../models/abi-catalog.model";
import {EtmDetailComponent} from "./etm-detail/etm-detail.component";
import {BarcodeScannerService} from "../../../services/barcode-scanner.service";
import {ABiTopicUpstreamService} from "../../../services/upstream/abi-topic-upstream.service";

import { ElementPositionDirective } from "../../../common/directives/element-position.directive";
import { SettingsService } from "../../../services/settings.service";
import { SettingsModel } from "../../../models/settings.model";



@Component({
    selector: 'inventory-etm',
    templateUrl: './etm.component.html'
})
export class EtmComponent extends Search {
    private barcodeResults: any;

    @Input()
    items: Array<ABiCatalogModel>;
    //item: ABiCatalogResultModel;

    @ViewChild(ElementPositionDirective)
    posDirective: ElementPositionDirective;

    @Input()
    count: number;

    modal: Modal;

    constructor(public navCtrl: NavController,
                public loadingCtrl: LoadingController,
                public alertController: AlertController,
                private barcodeScannerService: BarcodeScannerService,
                private upstreamService: ABiTopicUpstreamService,
                private abiCatalogService: ABiCatalogService,
                private hostServerService: HostServerService,
                private log: LoggerService,
                private modalController: ModalController,
                private settingsService: SettingsService) {
        super(loadingCtrl);
        //this.item = new ABiCatalogResultModel();
        this.items = new Array();
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

    public barcodeScan() {
        this.barcodeScannerService.scan()
            .then((results) => {
                this.barcodeResults = results;

                if (!results.cancelled) {
                    this.searchValue = results.text;
                    this.log.debug(`Barcode => ${results.text}, format => ${results.format}`);
                } else {
                    this.log.debug(`Scan request cancelled`);
                }
            })
            .catch((error) => {
                this.log.error(`${error}`);
            });
    }

    public storeBarcode() {
        if (this.barcodeResults != null) {
            this.upstreamService.sendData(this.barcodeResults)
                .then((result) => {
                    let message = `Stored barcode data to cache => Barcode => ${this.barcodeResults.text}, format => ${this.barcodeResults.format}`;
                    this.log.debug(`${message}`);

                    this.showAlert("", message);
                })
                .catch((error) => {
                    this.log.error(`${error}`);
                });
        }
    }

    private showAlert(title: string, subTitle: string) {
        let alert = this.alertController.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
    }

    public getSearchResults(searchValue: string) {
        this.log.debug('getting search results for value: ' + searchValue)
        this.showLoadingData({content:`Searching for ${searchValue}`});
        let server: ServerModel;
        this.hostServerService.getDefaultServer().then(s => server = s).then(() => {
            this.abiCatalogService.setServer(server);
            this.abiCatalogService.getABiCatalogRecords(searchValue)
                .map(response => response.json())
                .subscribe(
                    (response) => {
                        if (response) {
                            this.items = response.hits.fields;
                        }
                        //this.log.debug(`data => ${response.json()}`)
                        this.loadingEnded();
                    },
                    (error) => {
                        this.loadingEnded();
                        // todo show error growl...?
                        this.log.log(`Error => ${error}`);
                    });
        });
    }

    itemTapped(item: ABiCatalogModel) {
        // this.navCtrl.push(EtmDetailComponent, {
        //       item: item
        //   });
        this.presentModal(item);
    }

    public presentModal(item: ABiCatalogModel) {
        this.modal = this.modalController.create(EtmDetailComponent, {selected: item});
        this.modal.present();
    }

    public cancelModal() {
        this.modal.dismiss();
    }
}
