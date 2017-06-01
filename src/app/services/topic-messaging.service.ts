import {Injectable}    from '@angular/core';

import MQTT from 'mqtt';
import {CommonDataService} from "./common-data.service";
import {MessagingModel} from "../models/messaging.model";
import {LoggerService} from "./logger/logger-service";

@Injectable()
export class TopicMessagingService {
    private serviceName: string = "TopicMessaging Service";

    private messagingModel: MessagingModel;

    constructor(private commonDataService: CommonDataService,
                private log: LoggerService) {
        this.log.debug(`${this.serviceName} - Start`);

        this.messagingModel = commonDataService.messagingModel;
    }

    /**
     * Connects to a messaging broker
     * @param protocol
     * @param host
     * @param port
     * @param clientId
     * @returns a {Promise<T>} with a messaging broker client
     */
    public connect(protocol?: number, host?: string, port?: number, clientId?: string): Promise<any> {

        return new Promise((resolve, reject) => {
            let localProtocol = this.messagingModel.protocol;
            let localHost = this.messagingModel.host;
            let localPort = this.messagingModel.port;

            if(protocol) {
                localProtocol = protocol;
            }
            if(host) {
                localHost = host;
            }
            if(port) {
                localPort = port;
            }

            let brokerURL = `${localProtocol}://${localHost}:${localPort}`;
            if(clientId) {
                brokerURL = `${brokerURL}/?clientId=${clientId}`;

            }
            this.log.info(`messaging server => ${brokerURL}`);

            // reconnectPeriod: 2 (default), reconnect every 2 seconds until reconnectAttempts has reached
            //ws://localhost:9001/mqtt?clientId=123abc

            //{reconnectPeriod: this.messagingModel.reconnectPeriod}
            let client = MQTT.connect(`${brokerURL}`);
            client.on('connect', () => {
                this.log.debug(`Received connect event, Client ID => ${client.options.clientId}, connected => ${client.connected}`);
                resolve(client);
            });

            client.on('error', (error) => {
                this.log.error(`Received error event, Client ID => ${client.options.clientId}, connected => ${client.connected}`);
                reject(client);
            });
        });
    }

    /**
     * Subscribe to a topic
     * @param client
     * @param topic
     * @returns a {Promise<T>} with a messaging broker client
     */
    public subscribe(client: any, topic: string): Promise<any> {
        return new Promise((resolve, reject) => {
            client.subscribe(topic, function (err, granted) {
                if (err) {
                    reject(client);
                } else {
                    resolve(client);
                }
            });
        });
    }

    /**
     * Unsubscribe from a topic
     * @param client
     * @param topic
     * @returns a {Promise<T>} with a messaging broker client
     */
    public unsubscribe(client: any, topic: string): Promise<any> {
        return new Promise((resolve, reject) => {
            client.unsubscribe(topic, function (err) {
                if (err) {
                    reject(client);
                } else {
                    resolve(client);
                }
            });
        });
    }

    /**
     * Publish data to topic specified
     * @param client
     * @param topic
     * @param data
     * @returns a {Promise<T>} with a messaging broker client
     */
    public publish(client: any, topic: string, data: string): Promise<any> {
        return new Promise((resolve, reject) => {
            client.publish(topic, data, function (err) {
                if (err) {
                    reject(client);
                } else {
                    resolve(client);
                }
            });
        });
    }

    /**
     * Disconnect from the messaging broker
     * @param client
     * @returns a {Promise<T>} with a messaging broker client
     */
    public disconnect(client: any): Promise<any> {
        return new Promise((resolve, reject) => {
            client.end(true, () => {

                //TopicMessagingService.onServiceAvailableSubject.next(false);
                resolve(client);
            });
        });
    }
}
