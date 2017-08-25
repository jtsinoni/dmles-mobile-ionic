import {Injectable}    from '@angular/core';
import {LoggerService} from "../logger/logger-service";
import {TopicUpstreamService} from "./topic-upstream.service";
import {TopicMessagingService} from "../topic-messaging.service";
import {AppConfigConstants} from "../../constants/app-config.constants";
import {ABiDatabaseService} from "../database/abi-database.service";
import {ABiBarcodeTableModel} from "../../models/barcode/abi-barcode-table.model";

@Injectable()
export class ABiTopicUpstreamService extends TopicUpstreamService<ABiDatabaseService> {
    constructor(protected topicMessagingService: TopicMessagingService,
                protected abiDatabaseService: ABiDatabaseService,
                public log: LoggerService) {
        super(topicMessagingService, abiDatabaseService, AppConfigConstants.messagingServer.abi.topic, log);
    }

    setup() {
        // Attempt to connect to messaging server if connect flag is true
        if (AppConfigConstants.messagingServer.connect) {
            this.log.debug(`ABiTopicUpstream Service - Start`);

            this.name = "ABi";
            this.clientId = `${this.name}_mqttjs_${this.utilService.generateUUID()}`;
            this.start();
        }
    }

    public sendData(data: any): Promise<any> {
        return super.sendData(new ABiBarcodeTableModel(data.text, data.format));
    }
}
