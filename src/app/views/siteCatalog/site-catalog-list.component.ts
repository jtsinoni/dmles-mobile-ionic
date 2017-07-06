import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { LoggerService } from "../../services/logger/logger-service";
import { SiteCatalogService } from "../../common/endpoints/site-catalog.service";
import { HostServerService } from "../../services/host-server.service";

import { ServerModel } from "../../models/server.model";
import { Search } from "../common/search";
import { ABiCatalogModel } from "../../models/abi-catalog.model";
import { SiteCatalogModel } from "../../models/site-catalog.model";

@Component({
    selector: 'site-catalog-list',
    templateUrl: './site-catalog-list.component.html'
})
export class SiteCatalogListComponent extends Search {
    selectedItem: ABiCatalogModel;

    siteCatalogItems: Array<SiteCatalogModel>;

    constructor(
        loadingCtrl: LoadingController,
        public navCtrl: NavController,
        public navParams: NavParams,
        private log: LoggerService,
        public viewController: ViewController,
        private hostServerService: HostServerService,
        private siteCatalogService: SiteCatalogService) {
        super(loadingCtrl);


    }

    ngOnInit() {
        this.selectedItem = this.navParams.get('selected');
        this.getSiteCatalogData();
    }

    getSiteCatalogData() {
        if (this.selectedItem) {
            let hasPreferredProductIdentifier = (this.selectedItem.mmcProductIdentifier != null);
            let server: ServerModel;
            this.hostServerService.getDefaultServer().then(s => server = s).then(() => {
                this.siteCatalogService.setServer(server);
                if (hasPreferredProductIdentifier) {
                    this.log.debug("getting by product id");
                    this.siteCatalogService.retrieveSiteCatalogItems("product", this.selectedItem.mmcProductIdentifier)
                        .map(response => response.json())
                        .subscribe(
                        (response) => {
                            if (response) {
                                this.siteCatalogItems = response;
                            }
                        });
                } else {
                    this.log.debug("getting by enterprise id - this doesn't work");
                    this.siteCatalogService.retrieveSiteCatalogItems("enterprise", this.selectedItem.enterpriseProductIdentifier)
                        .map(response => response.json())
                        .subscribe(
                        (response) => {
                            if (response) {
                                this.siteCatalogItems = response;
                            }
                        });
                }

            });
        }
    }

}