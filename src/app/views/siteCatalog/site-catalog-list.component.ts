import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { LoggerService } from "../../services/logger/logger-service";
import { SiteCatalogService } from "../../common/endpoints/site-catalog.service";
import { HostServerService } from "../../services/host-server.service";

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
    siteItems: Array<SiteModel>;

    constructor(
        loadingCtrl: LoadingController,
        public navCtrl: NavController,
        public navParams: NavParams,
        private log: LoggerService,
        public viewController: ViewController,
        private hostServerService: HostServerService,
        private siteCatalogService: SiteCatalogService
    ) {
        super(loadingCtrl);

    }

    ngOnInit() {
        this.selectedItem = this.navParams.get('selected');
        this.siteItems = this.navParams.get('sites');       
        this.getSiteCatalogData();

    }

    getSiteCatalogData() {
        if (this.selectedItem) {
            this.showLoadingData({ content: `Loading site catalog items for ${this.selectedItem.enterpriseProductIdentifier}` });
            let hasProductIdentifier = (this.selectedItem.mmcProductIdentifier != null);
            let server: ServerModel;
            this.hostServerService.getDefaultServer().then(s => server = s).then(() => {
                this.siteCatalogService.setServer(server);
                if (hasProductIdentifier) {
                    this.log.debug("getting by product id");
                    this.siteCatalogService.retrieveSiteCatalogItems("product", this.selectedItem.mmcProductIdentifier)
                        .map(response => response.json())
                        .subscribe(
                        (response) => {
                            if (response) {
                                //this.siteCatalogItems = response;
                                this.setSiteNames(response);
                                this.loadingEnded();
                                this.log.debug("loaded the site catalog items");
                            }
                        },
                        (error) => {
                            this.loadingEnded();

                            this.log.log(`Error => ${error}`);
                            //let msg: string = "Error retrieving search results";
                        });
                } else {
                    this.log.debug("getting by enterprise id - this doesn't seem to work");
                    this.siteCatalogService.retrieveSiteCatalogItems("enterprise", this.selectedItem.enterpriseProductIdentifier)
                        .map(response => response.json())
                        .subscribe(
                        (response) => {
                            if (response) {
                                //
                                //this.siteCatalogItems = response;
                                this.setSiteNames(response);
                                this.loadingEnded();
                                this.log.debug("loaded the site catalog items");
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
            this.log.debug("getting the site name");
            let site = this.siteItems.find((t) => t.dodaac === item.siteDodaac);
            if (site) {
                item.siteName = site.name;
                this.log.debug("got the site name" + site.name);
            }
           // this.log.debug(" Site Name: " + item.siteName);
            this.siteCatalogItems.push(item);
        }
    }

}