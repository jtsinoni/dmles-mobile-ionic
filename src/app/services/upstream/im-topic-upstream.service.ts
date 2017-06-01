import {Injectable}    from '@angular/core';
import {LoggerService} from "../logger/logger-service";
import {IMBarcodeTableModel} from "../../models/barcode/im-barcode-table.model";
import {TopicUpstreamService} from "./topic-upstream.service";
import {TopicMessagingService} from "../topic-messaging.service";
import {IMDatabaseService} from "../database/im-database.service";
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
            this.clientId = `IM_mqttjs_${this.utilService.generateUUID()}`;
            this.start();
        }
    }

    public sendData(data: any): Promise<any> {
        return super.sendData(new IMBarcodeTableModel(data.text, data.format));
    }
}
