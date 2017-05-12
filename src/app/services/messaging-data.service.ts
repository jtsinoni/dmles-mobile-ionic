import { Injectable }    from '@angular/core';
import {MessagingDataModel} from "../models/messaging-data.model";
import {StoreDataModel} from "../models/store-data.model";
import {ForwardDataModel} from "../models/forward-data.model";
import {LoggerService} from "./logger/logger-service";

@Injectable()
export class MessagingDataService {
    private serviceName = "MessagingData Service";

    public messagingDataModel: MessagingDataModel;
    public storeDataModel: StoreDataModel;
    public forwardDataModel: ForwardDataModel;

    constructor (private log: LoggerService) {
        this.log.debug(`${this.serviceName} - Start`);

        this.messagingDataModel = new MessagingDataModel();
        this.storeDataModel = new StoreDataModel();
        this.forwardDataModel = new ForwardDataModel();
    }
}
