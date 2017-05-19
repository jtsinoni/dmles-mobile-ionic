import {Injectable}    from '@angular/core';
import {LoggerService} from "../logger/logger-service";
import {IMTableModel} from "../../models/im-table.model";
import {TopicUpstreamService} from "./topic-upstream.service";
import {TopicMessagingService} from "../topic-messaging.service";
import {IMDatabaseService} from "../im-database.service";
import {AppConfigConstants} from "../../constants/app-config.constants";

@Injectable()
export class IMTopicUpstreamService extends TopicUpstreamService<IMDatabaseService> {
    constructor(protected topicMessagingService: TopicMessagingService,
                protected imDatabaseService: IMDatabaseService,
                public log: LoggerService) {
        super(topicMessagingService, imDatabaseService, AppConfigConstants.messagingServer.im.topic, log);
    }

    setup() {
        this.log.debug(`IMTopicUpstream Service - Start`);

        // Attempt to connect to messaging server if connect flag is true
        if (AppConfigConstants.messagingServer.connect) {
            this.start();
        }
    }

    public sendData(data: any): Promise<any> {
        return super.sendData(new IMTableModel(data.text, data.format));
    }
}
