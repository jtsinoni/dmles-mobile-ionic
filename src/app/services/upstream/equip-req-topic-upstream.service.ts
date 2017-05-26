import {Injectable}    from '@angular/core';

import {LoggerService} from "../logger/logger-service";
import {StoreDataTableModel} from "../../models/store-data-table.model";
import {TopicUpstreamService} from "./topic-upstream.service";
import {TopicMessagingService} from "../topic-messaging.service";
import {StoreDatabaseService} from "../database/store-database.service";
import {AppConfigConstants} from "../../constants/app-config.constants";

@Injectable()
export class EquipReqTopicUpstreamService extends TopicUpstreamService<StoreDatabaseService> {
    constructor(protected topicMessagingService: TopicMessagingService,
                protected storeDatabaseService: StoreDatabaseService,
                public log: LoggerService) {
        super(topicMessagingService, storeDatabaseService, AppConfigConstants.messagingServer.eq.topic, log);
    }

    setup() {
        this.log.debug(`EquipReqTopicUpstream Service - Start`);

        // Attempt to connect to messaging server if connect flag is true
        if (AppConfigConstants.messagingServer.connect) {
            this.start();
        }
    }

    public sendData(data: any): Promise<any> {
        return super.sendData(new StoreDataTableModel(data));
    }
}
