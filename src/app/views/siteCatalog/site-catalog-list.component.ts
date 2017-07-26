import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { LoggerService } from "../../services/logger/logger-service";
import { SiteCatalogService } from "../../common/endpoints/site-catalog.service";
import { HostServerService } from "../../services/host-server.service";
import { SystemService } from "../../common/endpoints/system.service";


import { ServerModel } from "../../models/server.model";
import { SiteModel } from "../../models/branchServices/site.model";

import { Search } from "../common/search";
import { ABiCatalogModel } from "../../models/abi-catalog.model";
import { SiteCatalogModel } from "../../models/siteCatalog/site-catalog.model";
import { SiteCatalogHeaderComponent } from './site-catalog-header.component';
import { SubHeaderItem } from "../common/header/sub-header-item";

@Component({
    selector: 'site-catalog-list',
    templateUrl: './site-catalog-list.component.html'
})
export class SiteCatalogListComponent extends Search implements OnInit {
    selectedItem: ABiCatalogModel;
    subHeader: SubHeaderItem;

    siteCatalogItems: Array<SiteCatalogModel>;
    siteItems: Array<SiteModel>;

    componentTitle = "Site Catalog Items";

    constructor(
        loadingCtrl: LoadingController,
        public navCtrl: NavController,
        public navParams: NavParams,
        private log: LoggerService,
        public viewController: ViewController,
        private hostServerService: HostServerService,
        private siteCatalogService: SiteCatalogService,
        private systemService: SystemService
    ) {
        super(loadingCtrl);
        this.siteItems = new Array<SiteModel>();
        this.siteCatalogItems = new Array<SiteCatalogModel>();

    }

    ngOnInit() {
        this.selectedItem = this.navParams.get('selected');
        this.siteItems = this.navParams.get('sites');
        this.log.debug("ive got this many site items: " + (this.siteItems ? this.siteItems.length : 0));
        this.getSiteCatalogData();
        this.subHeader = new SubHeaderItem(SiteCatalogHeaderComponent, this.selectedItem);

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
                        .map((response) => {
                            return this.utilService.getPayload(response);
                        })
                        .subscribe(
                        (response) => {
                            if (response) {
                                this.setSiteNames(response);
                                this.log.debug("loaded the site catalog items");
                            }
                        },
                        (error) => {
                            this.loadingEnded();

                            this.log.log(`Error => ${error}`);
                        });
                } else {
                    this.log.debug("getting by enterprise id - this doesn't seem to work");
                    this.siteCatalogService.retrieveSiteCatalogItems("enterprise", this.selectedItem.enterpriseProductIdentifier)
                        .map((response) => {
                            return this.utilService.getPayload(response);
                        })
                        .subscribe(
                        (response) => {
                            if (response) {
                                this.setSiteNames(response);
                                this.log.debug("loaded the site catalog items");
                            }
                        },
                        (error) => {
                            this.loadingEnded();
                            this.log.log(`Error => ${error}`);
                        });
                }

            });
        }
    }

    private setSiteNames(response: any) {
        this.siteCatalogItems = response;
        for (let item of this.siteCatalogItems) {
            if (item.sources && item.sources[0]) {
                item.primarySupplier = item.sources[0].supplierNm;
                if (item.sources[0].packaging && item.sources[0].packaging[0]) {
                    item.primarySourcePackCode = item.sources[0].packaging[0].ipPackCd

                    item.primarySourcePackQuantity = item.sources[0].packaging[0].ipPackQty;
                    item.primarySourcePrice = item.sources[0].packaging[0].packPriceAmt;
                }
            }
            let site = this.siteItems.find((t) => t.dodaac === item.siteDodaac);
            if (site) {
                item.siteName = site.name;
                this.log.debug("setting the site name");
            }

        }
        this.loadingEnded();
    }

}