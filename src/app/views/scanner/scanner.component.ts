import { Component, Input } from '@angular/core';

import { Platform } from 'ionic-angular';
import { Focuser } from "../../common/directives/focuser.directive";
import { Search } from "../common/search";
import { LoadingController, ModalController, Modal } from 'ionic-angular';

import { LoggerService } from "../../services/logger/logger-service";
import { ABiCatalogService } from "../../common/endpoints/abi-catalog.service";
import { HostServerService } from "../../services/host-server.service";
import { ServerModel } from "../../models/server.model";
import { ABiCatalogResultModel } from "../../models/abi-catalog-result.model";
import { ABiCatalogModel } from "../../models/abi-catalog.model";
// import { SettingsService } from "../../services/settings.service";
// import { SettingsModel } from "../../models/settings.model";
import { WarningDialogComponent } from "../common/dialogs/warning-dialog.component";
import { InputNumericComponent } from "./input/input-numeric.component";


@Component({
  selector: 'scanner-inventory',
  templateUrl: './scanner.component.html'
})
export class ScannerComponent extends Search {

  @Input()
  item: ABiCatalogResultModel;

  modal: Modal;

  itemSelected: boolean;

  constructor(
    loadingCtrl: LoadingController,
    private platform: Platform,
    private abiCatalogService: ABiCatalogService,
    private hostServerService: HostServerService,
    private log: LoggerService,
    private modalController: ModalController
  ) {
    super(loadingCtrl);

    this.item = new ABiCatalogResultModel();
    this.item.setDefaults();
    this.itemSelected = false;
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
    if (item) {
    this.log.debug('item is NOT null');
    }
    this.modal = this.modalController.create(InputNumericComponent, { selected: item, id: item.enterpriseProductIdentifier, description: item.fullDescription, isConnected: this.isConnected });
    this.modal.present();
    //this.itemSelected = true;
    //alert("show add item modal");
  }


}