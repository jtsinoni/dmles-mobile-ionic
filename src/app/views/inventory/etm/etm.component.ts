import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Search } from "../../common/search";
import { LoadingController,ModalController, Modal } from 'ionic-angular';
import { LoggerService } from "../../../services/logger/logger-service";
import { ABiCatalogService } from "../../../services/catalog/abi-catalog.service";
import { HostServerService } from "../../../services/host-server.service";
import { ServerModel } from "../../../models/server.model";
//import { ABiCatalogResultModel } from "../../../models/abi-catalog-result.model";
import { ABiCatalogModel } from "../../../models/abi-catalog.model";
import { EtmDetailComponent } from "./etm-detail/etm-detail.component";


@Component({
  selector: 'inventory-etm',
  templateUrl: './etm.component.html'
})
export class EtmComponent extends Search {

  @Input()
  items: Array<ABiCatalogModel>;
  //item: ABiCatalogResultModel;

  @Input()
  count: number;

  modal: Modal;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private abiCatalogService: ABiCatalogService,
    private hostServerService: HostServerService,
    private log: LoggerService,
    private modalController: ModalController) {
    super(loadingCtrl);
    //this.item = new ABiCatalogResultModel();
    this.items = new Array();

  }

  public getSearchResults(searchValue: string) {
    this.log.debug('getting search results for value: ' + searchValue)
    this.showLoadingData(searchValue);
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
        this.modal = this.modalController.create(EtmDetailComponent, {selected : item});      
        this.modal.present();

    }

    public cancelModal() {
        this.modal.dismiss();
    }


}