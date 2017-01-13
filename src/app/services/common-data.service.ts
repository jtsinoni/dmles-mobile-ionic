import { Injectable }    from '@angular/core';
import {CommonDataModel} from "../models/common-data.model";
import {StoreDataModel} from "../models/store-data.model";
import {ForwardDataModel} from "../models/forward-data.model";
import {MessagingModel} from "../models/messaging.model";

@Injectable()
export class CommonDataService {
    public data: CommonDataModel;
    public storeDataModel: StoreDataModel;
    public forwardDataModel: ForwardDataModel;
    public messagingModel: MessagingModel;

    constructor () {
        this.data = new CommonDataModel();
        this.storeDataModel = new StoreDataModel();
        this.forwardDataModel = new ForwardDataModel();
        this.messagingModel = new MessagingModel();
    }
}
