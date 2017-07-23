import {Component, Input} from '@angular/core';
import {NavController, Modal, LoadingController, ModalController, NavParams} from 'ionic-angular';
import {Search} from "../../../common/search";
import {ABiCatalogResultModel} from "../../../../models/abi-catalog-result.model";
import {ABiCatalogService} from "../../../../common/endpoints/abi-catalog.service";
import {LoggerService} from "../../../../services/logger/logger-service";
import {WarningDialogComponent} from "../../../common/dialogs/warning-dialog.component";
import {EtmDetailComponent} from "../etm-detail/etm-detail.component";
import {ElasticQueryModel} from "../../../../models/search/elastic-query.model";

@Component({
    selector: 'inventory-etm-filtered',
    templateUrl: './etm-filtered.component.html'
})
export class EtmFilteredComponent extends Search {
    @Input()
    item: ABiCatalogResultModel;
    modal: Modal;
    selectedItem: any;
    queryModel: ElasticQueryModel;
    title: string;

    constructor(public navCtrl: NavController,
                private navParams: NavParams,
                public loadingCtrl: LoadingController,
                private abiCatalogService: ABiCatalogService,
                private log: LoggerService,
                private modalController: ModalController) {
        super(loadingCtrl);
    }

    ngOnInit() {
        this.item = new ABiCatalogResultModel();
        this.item.setDefaults();
        this.selectedItem = this.navParams.get('selected');
        this.queryModel = this.navParams.get('queryModel');
        this.title = this.navParams.get('title');

        let productDescription: string = this.getProductDescription();
        let message: string = `Searching ${this.title} for: ${productDescription}`;

        this.log.debug(message);
        this.loadingData(message);

        this.getSearchResults(this.queryModel);
    }

    public isPreferredItem(item: any) : boolean {
        return item.preferredProductIndicator.toUpperCase() === "Y" ? true : false;
    }

    public getSearchResults(queryModel: ElasticQueryModel) {
        this.abiCatalogService.getABiCatalogRecordsByQueryModel(queryModel)
            .timeout(8000)
            .map((response) => {
                return this.utilService.getPayload(response);
            })
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
                    let msg: string = "Error retrieving search results";
                    this.setErrorMessage(error, msg);
                });
    }

    private loadingData(searchValue: string) {
        super.showLoadingData({ content: searchValue, duration: 5000 });
    }

    private setErrorMessage(error: string, msg: string) {
        let errorModal = this.modalController.create(WarningDialogComponent, { txt: error, message: msg });
        errorModal.present();
    }

    itemTapped(item: any) {
        this.presentModal(item);
    }

    public presentModal(item: any) {
        // Turn off related and equivalen products selection
        item.productGroup = item.productSubstituteGroup = null;

        this.modal = this.modalController.create(EtmDetailComponent, {selected: item});
        this.modal.present();
    }

    public cancelModal() {
        this.modal.dismiss();
    }

    private getProductDescription(): string {
        return this.selectedItem.shortItemDescription || this.selectedItem.productNoun;
    }
}
