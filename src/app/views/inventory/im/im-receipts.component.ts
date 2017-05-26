import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {Search} from "../../common/search";
import {LoggerService} from "../../../services/logger/logger-service";
import {IMTopicUpstreamService} from "../../../services/upstream/im-topic-upstream.service";
import {BarcodeHelper} from "../../common/barcode-helper";

@Component({
    selector: 'inventory-im-receipts',
    templateUrl: './im-receipts.component.html',
    providers: [BarcodeHelper]
})
export class ImReceiptsComponent extends Search {
    constructor(public navCtrl: NavController,
                public loadingCtrl: LoadingController,
                public barcodeHelper: BarcodeHelper,
                private upstreamService: IMTopicUpstreamService,
                private log: LoggerService) {
        super(loadingCtrl);
    }

    public getSearchResults(searchValue: string) {
        this.log.debug('getting search results for value: ' + searchValue)
        this.showLoadingData({content:`Inventory search TBD, searching for ${searchValue}`, duration: 3000});
    }

    public barcodeScan() {
        this.barcodeHelper.barcodeScan()
            .then((results) => {
                this.searchValue = results.text;
            });
    }

    public storeBarcode() {
        this.barcodeHelper.storeBarcode(this.upstreamService);
    }

}
