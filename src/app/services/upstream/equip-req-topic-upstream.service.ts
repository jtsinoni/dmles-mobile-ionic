import {Injectable}    from '@angular/core';

import {LoggerService} from "../logger/logger-service";
import {MessagingDataService} from "../messaging-data.service";
import {StoreDataTableModel} from "../../models/store-data-table.model";
import {TopicUpstreamService} from "./topic-upstream.service";
import {TopicMessagingService} from "../topic-messaging.service";
import {NetworkService} from "../network.service";
import {StoreDatabaseService} from "../store-database.service";
import {DatabaseService} from "../database.service";

@Injectable()
export class EquipReqTopicUpstreamService extends TopicUpstreamService<StoreDataTableModel, StoreDatabaseService> {
    serviceName = "EquipReqTopicUpstream Service";

    constructor(protected topicMessagingService: TopicMessagingService,
                protected networkService: NetworkService,
                protected xdbService: DatabaseService,
                protected xstoreDbService: StoreDatabaseService,
                protected messagingDataService: MessagingDataService,
                protected log: LoggerService) {
        super(topicMessagingService, networkService, xstoreDbService, xdbService.getStoreDataTable(), messagingDataService, log);

    }

    /*
     constructor(protected topicMessagingService: TopicMessagingService,
     protected networkService: NetworkService,
     protected dbService: D,
     protected dbModel: M,
     protected messagingDataService: MessagingDataService,
     protected log: LoggerService) {
     */
}
