import {Component} from '@angular/core';
import {NavParams, ModalController, Modal} from 'ionic-angular';
import {ElasticQueryModel} from "../../../../models/search/elastic-query.model";
import {ElasticFilterFieldModel} from "../../../../models/search/elastic-filter-field.model";
import {EtmFilteredComponent} from "../filtered/etm-filtered.component";

@Component({
    selector: 'etm-detail',
    templateUrl: './etm-detail.component.html'
})
export class EtmDetailComponent {
    selectedItem: any;
    constructor(private navParams: NavParams,
                private modalController: ModalController) {
        this.selectedItem = navParams.get('selected');
    }

    getEquivalentProducts() {
        let queryModel: ElasticQueryModel = new ElasticQueryModel("");
        let fieldModel: ElasticFilterFieldModel = new ElasticFilterFieldModel("productSubstituteGroup", this.selectedItem.productSubstituteGroup);

        //{"queryString":"", "filters":[{"operator":"or","fieldValues":[{"field":"productSubstituteGroup","value":"2720"}]}]}
        queryModel.addFilter("or", [fieldModel]);

        this.presentModal(queryModel, "Equivalent Products");
    }

    getRelatedProducts() {
        let queryModel: ElasticQueryModel = new ElasticQueryModel("");
        let fieldModel: ElasticFilterFieldModel = new ElasticFilterFieldModel("productGroup", this.selectedItem.productGroup);

        //{"queryString":"", "filters":[{"operator":"or","fieldValues":[{"field":"productGroup","value":"42291033900"}]}]}
        queryModel.addFilter("or", [fieldModel]);

        this.presentModal(queryModel, "Related Products");
    }

    private presentModal(queryModel: ElasticQueryModel, title: string) {
        let modal: Modal = this.modalController.create(EtmFilteredComponent, { selected: this.selectedItem, queryModel: queryModel, title: title });
        modal.present();
    }
}
