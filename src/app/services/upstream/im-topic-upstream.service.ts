import {Injectable}    from '@angular/core';

import {LoggerService} from "../logger/logger-service";
import {IMTableModel} from "../../models/im-table.model";
import {TopicUpstreamService} from "./topic-upstream.service";
import {TopicMessagingService} from "../topic-messaging.service";
import {NetworkService} from "../network.service";
import {IMDatabaseService} from "../im-database.service";
import {MessagingModel} from "../../models/messaging.model";
import {AppConfigConstants} from "../../constants/app-config.constants";

@Injectable()
export class IMTopicUpstreamService extends TopicUpstreamService<IMDatabaseService> {
    serviceName = "IMTopicUpstream Service";

    constructor(protected topicMessagingService: TopicMessagingService,
                protected networkService: NetworkService,
                protected imDatabaseService: IMDatabaseService,
                public log: LoggerService) {
        super(topicMessagingService, networkService, imDatabaseService, new MessagingModel(AppConfigConstants.messagingServer.im.topic), log);
    }

    public sendData(data: any): Promise<any> {
        return super.sendData(new IMTableModel(data.text, data.format));
    }
}
