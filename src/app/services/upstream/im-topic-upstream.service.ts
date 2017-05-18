import {Injectable}    from '@angular/core';
import {Network} from "ionic-native";
import {LoggerService} from "../logger/logger-service";
import {IMTableModel} from "../../models/im-table.model";
import {TopicUpstreamService} from "./topic-upstream.service";
import {TopicMessagingService} from "../topic-messaging.service";
import {IMDatabaseService} from "../im-database.service";
import {MessagingModel} from "../../models/messaging.model";
import {AppConfigConstants} from "../../constants/app-config.constants";

@Injectable()
export class IMTopicUpstreamService extends TopicUpstreamService<IMDatabaseService> {
    constructor(protected topicMessagingService: TopicMessagingService,
                protected imDatabaseService: IMDatabaseService,
                public log: LoggerService) {
        super(topicMessagingService, imDatabaseService, new MessagingModel(AppConfigConstants.messagingServer.im.topic), log);
    }

    init() {
        this.log.debug(`IMTopicUpstream Service - Start`);
        this.topic = AppConfigConstants.messagingServer.im.topic;

        // Attempt to connect to messaging server if connect flag is true
        if (AppConfigConstants.messagingServer.connect) {
            this.connect()
                .then((client) => {
                    this.client = client;
                    if(client.connected) {
                        this.log.debug(`Received connect event, Client ID: ${client.options.clientId}, connected: ${client.connected}`);
                    } else {
                        throw new Error("Client not connected to messaging server.");
                    }
                })
                // .then(() => {
                //     //this.subscribe();
                // })
                .catch((error) => {
                    this.log.error(error);
                })

            Network.onConnect().subscribe(() => {
                this.connect()
                    .then(() => {
                        this.pushLocalChanges();
                    })
                    .catch((error) => {
                        this.log.error(error);
                    })
            });
        }
    }

    public sendData(data: any): Promise<any> {
        return super.sendData(new IMTableModel(data.text, data.format));
    }
}
