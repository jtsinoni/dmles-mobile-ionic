import {Injectable}    from '@angular/core';

import MQTT from 'mqtt';
import {CommonDataService} from "./common-data.service";
import {Subject, Observable} from "rxjs";
import {MessagingModel} from "../models/messaging.model";
import {LoggerService} from "./logger/logger-service";

@Injectable()
export class TopicMessagingService {
    private serviceName: string = "TopicMessaging Service";

    private static onServiceAvailableSubject: Subject<any> = new Subject();
    private static onTryToConnectSubject: Subject<any> = new Subject();
    private static onReconnectAttemptsSubject: Subject<any> = new Subject();

    private messagingModel: MessagingModel;

    constructor(private commonDataService: CommonDataService,
                private log: LoggerService) {
        this.log.debug(`${this.serviceName} - Start`);

        this.messagingModel = commonDataService.messagingModel;
    }

    public static onServiceAvailable(): Observable<any> {
        return (TopicMessagingService.onServiceAvailableSubject.asObservable());
    }

    public static onTryToConnect(): Observable<any> {
        return (TopicMessagingService.onTryToConnectSubject.asObservable());
    }

    public static onReconnectAttempts(): Observable<any> {
        return (TopicMessagingService.onReconnectAttemptsSubject.asObservable());
    }

    /**
     * Connects to a messaging broker
     * @param protocol
     * @param host
     * @param port
     * @returns a {Promise<T>} with a messaging broker client
     */
    public connect(protocol?: number, host?: string, port?: number): Promise<any> {

        return new Promise((resolve, reject) => {
            let localProtocol = this.messagingModel.protocol;
            let localHost = this.messagingModel.host;
            let localPort = this.messagingModel.port;

            if (protocol != null) {
                localProtocol = protocol;
            }
            if (host != null) {
                localHost = host;
            }
            if (port != null) {
                localPort = port;
            }

            let brokerURL = `${localProtocol}://${localHost}:${localPort}`;
            this.log.info(`messaging server => ${brokerURL}`);

            // reconnectPeriod: 2 (default), reconnect every 2 seconds until reconnectAttempts has reached
            //ws://localhost:9001/mqtt?clientId=123abc

            //{reconnectPeriod: this.messagingModel.reconnectPeriod}
            let client = MQTT.connect(`${brokerURL}`);
            client.on('connect', () => {
                //this.log.debug(`Received connect event, Client ID => ${this.client.options.clientId}, connected => ${this.client.connected}`);
                resolve(client);
            });

            client.on('error', (error) => {
                this.log.error(`Received error event, Client ID => ${client.options.clientId}, connected => ${client.connected}`);
                reject(client);
            });
        });
            //return this.client = MQTT.connect(`${brokerURL}`);

        //     this.client.on('connect', () => {
        //         //console.log(`Received online event, Client ID: ${this.client.options.clientId}, connected: ${this.client.connected}`);
        //
        //         TopicMessagingService.onTryToConnectSubject.next(true);
        //         TopicMessagingService.onServiceAvailableSubject.next(true);
        //         resolve(this.client);
        //     });
        //
        //     this.client.on('error', (error) => {
        //
        //         this.log.error(`Received error event, Client ID: ${this.client.options.clientId}, connected: ${this.client.connected}`);
        //         resolve(this.client);
        //     });
        //
        //     this.client.on('offline', (results) => {
        //         this.log.warn(`Received offline event, Client ID: ${this.client.options.clientId}, connected: ${this.client.connected}`);
        //
        //         TopicMessagingService.onTryToConnectSubject.next(false);
        //         TopicMessagingService.onServiceAvailableSubject.next(false);
        //         resolve(this.client);
        //     });
        //
        //     /**
        //      * This works in Chrome browser
        //      * @param event
        //      */
        //     this.client.stream.socket.onerror = (event) => {
        //         if (this.client.stream.socket.readyState == 1) {
        //             this.log.debug(`WebSocket normal error =>  ${event.type}`);
        //         }
        //     }
        //
        //     /**
        //      * This works in Safari iOS
        //      * @param event
        //      */
        //     this.client.stream.socket.onclose = (event) => {
        //         if (event.code == 3001) {
        //             this.log.debug(`WebSocket closed => ${event.code}`);
        //         } else {
        //             this.log.debug(`WebSocket connection error code => ${event.code}`);
        //         }
        //         this.client.stream.socket = null;
        //     }
        //
        //
        //     //stop trying to reconnect after 3 (default) attempts
        //     let tries = 1;
        //     this.client.on('reconnect', () => {
        //         TopicMessagingService.onReconnectAttemptsSubject.next({message: `Reconnect attempt => ${tries}`, tries: tries});
        //
        //         if(tries == this.dataModel.reconnectAttempts) {
        //             this.disconnect();
        //             let message = `Stopped retrying to get a connection after ${this.dataModel.reconnectAttempts} attempts`;
        //             this.log.log(message);
        //
        //             TopicMessagingService.onTryToConnectSubject.next(true);
        //             TopicMessagingService.onServiceAvailableSubject.next(false);
        //             TopicMessagingService.onReconnectAttemptsSubject.next({message: message, tries: tries});
        //         }
        //         tries++;
        //
        //         resolve(this.client);
        //     });
        // });
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
