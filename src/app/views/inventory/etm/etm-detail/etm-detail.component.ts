    import {Component} from '@angular/core';
import {NavParams, LoadingController, ModalController} from 'ionic-angular';
import {LoggerService} from "../../../../services/logger/logger-service";
import {ABiCatalogService} from "../../../../common/endpoints/abi-catalog.service";
import {Search} from "../../../common/search";
import {WarningDialogComponent} from "../../../common/dialogs/warning-dialog.component";
import {ABiCatalogResultModel} from "../../../../models/abi-catalog-result.model";
import {Input} from "@angular/core";
import {ElasticQueryModel} from "../../../../models/search/elastic-query.model";
import {ElasticFilterFieldModel} from "../../../../models/search/elastic-filter-field.model";

@Component({
    selector: 'etm-detail',
    templateUrl: './etm-detail.component.html'
})
export class EtmDetailComponent extends Search {
    @Input()
    item: ABiCatalogResultModel;

    selectedItem: any;
    searchValue: string;

    constructor(private loadingController: LoadingController,
                private navParams: NavParams,
                private log: LoggerService,
                private abiCatalogService: ABiCatalogService,
                private modalController: ModalController) {
        super(loadingController);
        this.selectedItem = navParams.get('selected');
        this.searchValue = navParams.get('searchValue');

        this.item = new ABiCatalogResultModel();
        this.item.setDefaults();
    }

    getEquivalentProducts() {
        this.log.debug('getting equivalent products results for value: ' + this.searchValue);
        this.loadingData(`Searching equivalent products for: ${this.searchValue}`);

        let queryModel: ElasticQueryModel = new ElasticQueryModel(this.searchValue);
        let fieldModel: ElasticFilterFieldModel = new ElasticFilterFieldModel("productSubstituteGroup", this.selectedItem.productSubstituteGroup);
        queryModel.addFilter("or", [fieldModel]);

        //{"queryString":"", "filters":[{"operator":"or","fieldValues":[{"field":"productSubstituteGroup","value":"2720"}]}]}

        this.getSearchResults(queryModel);
        /*
         {
         "queryString": "ibuprofen",
         "filters": [
         {
         "operator": "or",
         "fieldValues": [
         {
         "field": "productSubstituteGroup",
         "value": "2720"
         }
         ]
         }
         ]
         }
         */

    }

    getRelatedProducts() {
        this.log.debug('getting related products results for value: ' + this.searchValue);
        this.loadingData(`Searching related products for: ${this.searchValue}`);

        let queryModel: ElasticQueryModel = new ElasticQueryModel(this.searchValue);
        let fieldModel: ElasticFilterFieldModel = new ElasticFilterFieldModel("productGroup", this.selectedItem.productGroup);
        queryModel.addFilter("or", [fieldModel]);

        //{"queryString":"", "filters":[{"operator":"or","fieldValues":[{"field":"productGroup","value":"42291033900"}]}]}
        this.getSearchResults(queryModel);
        /*
         {
         "queryString": "ibu",
         "filters": [
         {
         "operator": "or",
         "fieldValues": [
         {
         "field": "productGroup",
         "value": "42291033900"
         }
         ]
         }
         ]
         }
         */

    }

    private getSearchResults(queryModel: ElasticQueryModel) {
        this.abiCatalogService.getABiCatalogRecordsByQueryModel(queryModel)
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
}
