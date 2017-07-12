import { Component, Input } from '@angular/core';

import { Platform } from 'ionic-angular';
import { Focuser } from "../../common/directives/focuser.directive";
import { Search } from "../common/search";
import { LoadingController, ModalController, Modal } from 'ionic-angular';

import { LoggerService } from "../../services/logger/logger-service";
import { ABiCatalogService } from "../../common/endpoints/abi-catalog.service";
import { HostServerService } from "../../services/host-server.service";
import { SystemService } from "../../common/endpoints/system.service";


import { ServerModel } from "../../models/server.model";
import { ABiCatalogResultModel } from "../../models/abi-catalog-result.model";
import { ABiCatalogModel } from "../../models/abi-catalog.model";
// import { SettingsService } from "../../services/settings.service";
// import { SettingsModel } from "../../models/settings.model";
import { WarningDialogComponent } from "../common/dialogs/warning-dialog.component";
//import { InputNumericComponent } from "./input/input-numeric.component";
import { SiteCatalogListComponent } from "../siteCatalog/site-catalog-list.component";
import { EtmDetailComponent } from "../inventory/etm/etm-detail/etm-detail.component";
import { BranchModel } from "../../models/branchServices/branch.model"
import { SiteModel } from "../../models/branchServices/site.model"


@Component({
  selector: 'scanner-inventory',
  templateUrl: './scanner.component.html'
})
export class ScannerComponent extends Search  {

  @Input()
  item: ABiCatalogResultModel;

  modal: Modal;

  itemSelected: boolean;

  searchValue: string;

  refineSearchValue: string;

  private branchServices: Array<BranchModel>;

  private sites: Array<SiteModel>;

  constructor(
    loadingCtrl: LoadingController,
    private platform: Platform,
    private abiCatalogService: ABiCatalogService,
    private hostServerService: HostServerService,
    private log: LoggerService,
    private modalController: ModalController,
    private systemService: SystemService
  ) {
    super(loadingCtrl);

    this.item = new ABiCatalogResultModel();
    this.item.setDefaults();
    this.itemSelected = false;
    this.searchValue = "";
    this.sites = new Array<SiteModel>();
  }
  
  ionViewDidEnter() {
    this.resetFocus();

  }

  private resetFocus() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        Focuser.refocus();
      }, 800);
    });
  }

  public getSearchResults() {
    this.item.setDefaults();
    this.log.debug('getting search results for value: ' + this.searchValue)
    this.showLoadingData({ content: `Searching for ${this.searchValue}` });
    let server: ServerModel;
    this.hostServerService.getDefaultServer().then(s => server = s).then(() => {
      this.abiCatalogService.setServer(server);
      this.abiCatalogService.getABiCatalogRecords(this.searchValue, null, this.refineSearchValue)
        .timeout(8000)
        .map(response => response.json())
        .subscribe(
        (response) => {
          if (response) {
            this.item.setResults(response.total, response.took, response.hits.fields);
          }
          this.getSites();          
          this.item.resultReturned = true;          

        },
        (error) => {
          this.loadingEnded();
          this.item.setDefaults();
          this.item.resultReturned = true;
          this.log.log(`Error => ${error}`);
          let msg: string = "Error retrieving search results";
          this.setErrorMessage(error, msg);

        });
    });
  }

  showDetail(item: ABiCatalogModel) {
    this.presentModal(item);
  }

  hasOneOrNoneResult(): boolean {
    return this.item.resultCount < 2;
  }


  public presentModal(item: ABiCatalogModel) {
    // this.modal = this.modalController.create(InputNumericComponent, { selected: item, id: item.enterpriseProductIdentifier, description: item.fullDescription });
    // this.modal.onDidDismiss(data => {
    //   this.onDataSaved(data);
    // })
    // this.modal.present();  
    this.modal = this.modalController.create(EtmDetailComponent, { selected: item });
    this.modal.present();
  }

  setErrorMessage(error: string, msg: string) {
    let errorModal = this.modalController.create(WarningDialogComponent, { txt: error, message: msg });
    errorModal.present();
  }

  onDataSaved(data: any) {

    if (data) {
      let id = data.id;
      let quantity = data.quantity;
      this.log.info("got: " + id + " qty:" + quantity);
      // todo 
      // if (!this.isConnected) {
      // // store data locally
      // } else {
      //  // send to server
      // }

    }

    this.item.items = [];
    this.item.resultReturned = false;
    this.searchValue = "";
    this.resetFocus();
  }

  public isPreferredItem(item: ABiCatalogModel): boolean {
    if (item && item.preferredProductIndicator) {
      return item.preferredProductIndicator.toUpperCase() === "Y" ? true : false;
    } else {
      return false;
    }
  }

  goToSiteCatalogRecords(abiItem: ABiCatalogModel) {
    this.log.debug("Go to site catalog records - sites has this many: " + this.sites.length);
    this.modal = this.modalController.create(SiteCatalogListComponent, { selected: abiItem, sites: this.sites });
    //this.modal = this.modalController.create(SiteCatalogListComponent, { selected: abiItem });
    this.modal.present();

  }

  private getSites() {
    this.log.log("In get sites ");
    this.systemService.getBranchServices()
      .map(response => response.json())
      .subscribe((response) => {
        this.branchServices = response;
        this.log.log("branch services is " + this.branchServices);
        if (this.branchServices) {
          for (let branch of this.branchServices) {
            for (let region of branch.regions) {
              for (let site of region.sites) {
                this.sites.push(site);
                this.log.debug(site.dodaac + " " + site.name);
              }
            }
          }
        }
      });
      this.loadingEnded();
  }

}