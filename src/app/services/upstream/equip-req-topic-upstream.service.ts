import {Injectable}    from '@angular/core';

import {LoggerService} from "../logger/logger-service";
import {StoreDataTableModel} from "../../models/store-data-table.model";
import {TopicUpstreamService} from "./topic-upstream.service";
import {TopicMessagingService} from "../topic-messaging.service";
import {NetworkService} from "../network.service";
import {StoreDatabaseService} from "../store-database.service";
import {DatabaseTableModelService} from "../database-table-model.service";
import {CommonDataService} from "../common-data.service";

@Injectable()
export class EquipReqTopicUpstreamService extends TopicUpstreamService<StoreDatabaseService> {
    serviceName = "EquipReqTopicUpstream Service";

    constructor(protected topicMessagingService: TopicMessagingService,
                protected networkService: NetworkService,
                protected storeDatabaseService: StoreDatabaseService,
                public commonDataService: CommonDataService,
                public log: LoggerService) {
        super(topicMessagingService, networkService, storeDatabaseService, commonDataService, log);

    }

    public sendData(data: any): Promise<any> {
        return super.sendData(new StoreDataTableModel(JSON.stringify(data)));
    }

    /*
     constructor(private topicMessagingService: TopicMessagingService,
     private networkService: NetworkService,
     private databaseService: D,
     public commonDataService: CommonDataService,
     public log: LoggerService) {    */
}
