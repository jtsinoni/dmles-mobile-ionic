import {Injectable}    from '@angular/core';

import {LoggerService} from "../logger/logger-service";
import {StoreDataTableModel} from "../../models/store-data-table.model";
import {TopicUpstreamService} from "./topic-upstream.service";
import {TopicMessagingService} from "../topic-messaging.service";
import {StoreDatabaseService} from "../store-database.service";
import {MessagingModel} from "../../models/messaging.model";
import {AppConfigConstants} from "../../constants/app-config.constants";
import {Network} from "ionic-native";

@Injectable()
export class EquipReqTopicUpstreamService extends TopicUpstreamService<StoreDatabaseService> {
    constructor(protected topicMessagingService: TopicMessagingService,
                protected storeDatabaseService: StoreDatabaseService,
                public log: LoggerService) {
        super(topicMessagingService, storeDatabaseService, new MessagingModel(AppConfigConstants.messagingServer.eq.topic), log);
    }

    init() {
        this.log.debug(`EquipReqTopicUpstream Service - Start`);
        this.topic = AppConfigConstants.messagingServer.eq.topic;

        // Attempt to connect to messaging server if connect flag is true
        if (AppConfigConstants.messagingServer.connect) {
            this.connect()
                .then((client) => {
                    this.client = client;
                    if(client.connected) {
                        this.log.debug(`Received connect event, Client ID: ${client.options.clientId}, connected: ${client.connected}`);

                        return client;
                    } else {
                        throw new Error("Client not connected to messaging server.");
                    }
                })
                .then((client) => {
                    this.pushLocalChanges();
                })
                .catch((error) => {
                    this.log.error(error);
                })

            Network.onConnect().subscribe(() => {
                this.connect()
                    .then((client) => {
                        this.client = client;
                        this.log.debug(`Received connect event, Client ID: ${client.options.clientId}, connected: ${client.connected}`);

                        return client;
                    })
                    .then((client) => {
                        this.pushLocalChanges();
                    })
                    .catch((error) => {
                        this.log.error(error);
                    })
            });

            Network.onDisconnect().subscribe(() => {
                this.disconnect()
                    .then((client) => {
                        this.client = client;
                        this.log.debug(`Received disconnect event, Client ID: ${client.options.clientId}, connected: ${client.connected}`);
                    })
                    .catch((error) => {
                        this.log.error(error);
                    })
            });
        }
    }

    public sendData(data: any): Promise<any> {
        return super.sendData(new StoreDataTableModel(data));
    }
}
