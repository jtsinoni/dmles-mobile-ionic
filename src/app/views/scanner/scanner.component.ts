import { Component, Input, OnInit, ViewChild } from '@angular/core';

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
import { SettingsService } from "../../services/settings.service";
import { SettingsModel } from "../../models/settings.model";
import { WarningDialogComponent } from "../common/dialogs/warning-dialog.component";
//import { InputNumericComponent } from "./input/input-numeric.component";
import { SiteCatalogListComponent } from "../siteCatalog/site-catalog-list.component";
import { EtmDetailComponent } from "../inventory/etm/etm-detail/etm-detail.component";
import { BranchModel } from "../../models/branchServices/branch.model"
import { SiteModel } from "../../models/branchServices/site.model"

import { BarcodeHelper } from "../common/barcode-helper";
import { ElementPositionDirective } from "../../common/directives/element-position.directive";
import { ABiTopicUpstreamService } from "../../services/upstream/abi-topic-upstream.service";

@Component({
  selector: 'scanner-inventory',
  templateUrl: './scanner.component.html',
  providers: [BarcodeHelper]
})
export class ScannerComponent extends Search implements OnInit {

  @Input()
  item: ABiCatalogResultModel;

  @ViewChild(ElementPositionDirective)
  posDirective: ElementPositionDirective;

  modal: Modal;

  itemSelected: boolean;

  searchValue: string;

  refineSearchValue: string;

  private branchServices: Array<BranchModel>;

  private sites: Array<SiteModel>;

  isScannerDevice: boolean = false;

  constructor(
    loadingCtrl: LoadingController,
    private platform: Platform,
    private abiCatalogService: ABiCatalogService,
    private hostServerService: HostServerService,
    private log: LoggerService,
    private modalController: ModalController,
    private systemService: SystemService,
    public barcodeHelper: BarcodeHelper,
    public settingsService: SettingsService,
    private upstreamService: ABiTopicUpstreamService,
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

  ngOnInit() {
    this.getSites();

    let setting: SettingsModel;

    this.settingsService.getEnableScannerSetting().then(s => setting = s).then(() => {
      if (setting) {
        this.isScannerDevice = setting.setting;
        this.log.debug("is Scanner = " + this.isScannerDevice);
      }

    }).then(() => {
      if (!this.isScannerDevice) {
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
    });

  }

  public getSearchResults() {
    this.item.setDefaults();
    if (this.searchValue && this.searchValue.length > 0) {
      this.log.debug('getting search results for value: ' + this.searchValue)
      this.showLoadingData({ content: `Searching for ${this.searchValue}` });
      let server: ServerModel;
      this.hostServerService.getDefaultServer().then(s => server = s).then(() => {
        this.abiCatalogService.setServer(server);
        this.abiCatalogService.getABiCatalogRecords(this.searchValue, null, this.refineSearchValue)
          .timeout(8000)
            .map((response) => {
              return this.utilService.getPayload(response);
            })
          .subscribe(
          (response) => {
            if (response) {
              this.item.setResults(response.total, response.took, response.hits.fields);
            }
            this.item.resultReturned = true;
            this.loadingEnded();

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
    } else {
     this.item.clearItems();
    }
  }

  showDetail(item: ABiCatalogModel) {
    this.presentModal(item);
  }

  hasOneOrNoneResult(): boolean {
    if (this.refineSearchValue) {
      return false;
    } else {
      return this.item.resultCount < 2;
    }
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

    if (this.isPreferredItem(abiItem)) {
      abiItem.isPreferredProduct = true;
    }

    this.modal = this.modalController.create(SiteCatalogListComponent, { selected: abiItem, sites: this.sites }); //, sites: this.sites
    this.modal.present();

  }

  private getSites() {
    let server: ServerModel;
    this.hostServerService.getDefaultServer().then(s => server = s).then(() => {
      this.systemService.setServer(server);
    }).then(() => {
      // this.log.debug("In get sites ");
      this.systemService.getBranchServices()
        .map((results) => {
          if(results) {
            return this.utilService.getPayload(results);
          }
        })
        .subscribe((response) => {
          this.branchServices = response;
          if (this.branchServices) {
            for (let branch of this.branchServices) {
              for (let region of branch.regions) {
                for (let site of region.sites) {
                  this.sites.push(site);
                  // this.log.debug(site.dodaac + " " + site.name);
                }
              }
            }
          }
        });
    });
  }

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


}