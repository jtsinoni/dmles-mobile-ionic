import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { LoggerService } from "../../services/logger/logger-service";
import { SiteCatalogService } from "../../common/endpoints/site-catalog.service";
import { HostServerService } from "../../services/host-server.service";
import { SystemService } from "../../common/endpoints/system.service";

import { ServerModel } from "../../models/server.model";
import { SiteModel } from "../../models/branchServices/site.model";

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
        private siteCatalogService: SiteCatalogService,
        private systemService: SystemService) {
        super(loadingCtrl);


    }

    ngOnInit() {
        this.selectedItem = this.navParams.get('selected');
        this.getSiteCatalogData();
        this.systemService.getServices();
    }

    getSiteCatalogData() {
        if (this.selectedItem) {
            this.showLoadingData({ content: `Loading site catalog items for ${this.selectedItem.shortItemDescription}` });
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
                                this.loadingEnded();
                            }
                        },
                        (error) => {
                            this.loadingEnded();

                            this.log.log(`Error => ${error}`);
                            //let msg: string = "Error retrieving search results";
                        });
                } else {
                    this.log.debug("getting by enterprise id - this doesn't work");
                    this.siteCatalogService.retrieveSiteCatalogItems("enterprise", this.selectedItem.enterpriseProductIdentifier)
                        .map(response => response.json())
                        .subscribe(
                        (response) => {
                            if (response) {
                                this.siteCatalogItems = response;
                                this.loadingEnded();
                            }
                        },
                        (error) => {
                            this.loadingEnded();

                            this.log.log(`Error => ${error}`);
                            //let msg: string = "Error retrieving search results";
                        });
                }

            });
        }
    }

    private setSiteNames(tempItems: Array<SiteCatalogModel>) {
        this.siteCatalogItems = new Array<SiteCatalogModel>();
        for (let item of tempItems) {
            let site: SiteModel = this.systemService.getSiteFromDodaac(item.siteDodaac);
            if (site) {
                this.log.debug("got site: " + site.dodaac + " " + site.name);
                item.siteName = site.name;
            }
            this.siteCatalogItems.push(item);
        }
    }

}