import {Injectable}    from '@angular/core';

import MQTT from 'mqtt';
import {MessagingDataModel} from "../models/messaging-data.model";
import {MessagingDataService} from "./messaging-data.service";
import {Subject, Observable} from "rxjs";
import {LoggerService} from "./logger/logger-service";
import {AppConfigConstants} from "../constants/app-config.constants";

@Injectable()
export class TopicMessagingService {
    private serviceName: string = "TopicMessaging Service";

    public client: any;
    private static onServiceAvailableSubject: Subject<any> = new Subject();
    private static onTryToConnectSubject: Subject<any> = new Subject();
    private static onReconnectAttemptsSubject: Subject<any> = new Subject();

    private messagingDataModel: MessagingDataModel;

    constructor(private messagingDataService: MessagingDataService,
                private log: LoggerService) {
        this.log.debug(`${this.serviceName} - Start`);

        this.messagingDataModel = messagingDataService.messagingDataModel;
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
     * @param host
     * @param port
     * @returns {Promise<T>|Promise}
     */
    public connect(protocol: number, host: string, port: number): Promise<any> {

        return new Promise((resolve, reject) => {
            let brokerURL = `${this.messagingDataModel.protocol}://${this.messagingDataModel.host}:${AppConfigConstants.messagingServer.port}`;
            this.log.info(`messaging server => ${brokerURL}`);

            // reconnectPeriod: 2 (default), reconnect every 2 seconds until reconnectAttempts has reached
            //ws://localhost:9001/mqtt?clientId=123abc

            this.client = MQTT.connect(`${brokerURL}`);

            this.client.on('connect', () => {
                //console.log(`Received online event, Client ID: ${this.client.options.clientId}, connected: ${this.client.connected}`);

                TopicMessagingService.onTryToConnectSubject.next(true);
                TopicMessagingService.onServiceAvailableSubject.next(true);
                resolve(this.client);
            });

            this.client.on('error', (error) => {

                this.log.error(`Received error event, Client ID: ${this.client.options.clientId}, connected: ${this.client.connected}`);
                resolve(this.client);
            });

            this.client.on('offline', (results) => {
                this.log.warn(`Received offline event, Client ID: ${this.client.options.clientId}, connected: ${this.client.connected}`);

                TopicMessagingService.onTryToConnectSubject.next(false);
                TopicMessagingService.onServiceAvailableSubject.next(false);
                resolve(this.client);
            });

            /**
             * This works in Chrome browser
             * @param event
             */
            this.client.stream.socket.onerror = (event) => {
                if (this.client.stream.socket.readyState == 1) {
                    this.log.debug(`WebSocket normal error =>  ${event.type}`);
                }
            }

            /**
             * This works in Safari iOS
             * @param event
             */
            this.client.stream.socket.onclose = (event) => {
                if (event.code == 3001) {
                    this.log.debug(`WebSocket closed => ${event.code}`);
                } else {
                    this.log.debug(`WebSocket connection error code => ${event.code}`);
                }
                this.client.stream.socket = null;
            }


            //stop trying to reconnect after 10 (default) attempts
            //TODO: Use RXJS interval Observables
            // let source = Observable
            //     .fromEventPattern(
            //         (h) => {  this.client.on('reconnect', h); },
            //         (h) => {  }
            //     )
            //     .timeInterval();
            //
            // source.subscribe(
            //     x => console.log(`Received reconnect event in Observable => ${JSON.stringify(x)}`),
            //     err => console.log('Error: ' + err),
            //     () => console.log('Completed'));

            let tries = 1;
            this.client.on('reconnect', () => {
                TopicMessagingService.onReconnectAttemptsSubject.next({message: `Reconnect attempt => ${tries}`, tries: tries});

                if(tries == this.messagingDataModel.reconnectAttempts) {
                    this.disconnect();
                    let message = `Stopped retrying to get a connection after ${this.messagingDataModel.reconnectAttempts} attempts`;
                    this.log.log(message);

                    TopicMessagingService.onTryToConnectSubject.next(true);
                    TopicMessagingService.onServiceAvailableSubject.next(false);
                    TopicMessagingService.onReconnectAttemptsSubject.next({message: message, tries: tries});
                }
                tries++;

                resolve(this.client);
            });
        });
    }

    /**
     * Subscribe to a topic
     * @param topic
     * @returns {Promise<T>|Promise}
     */
    public subscribe(topic: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.subscribe(topic, {qos: 1}, function (err, granted) {
                if (err) {
                    reject(err);
                } else {
                    resolve(granted);
                }
            });
        });
    }

    /**
     * Unsubscribe from a topic
     * @param topic
     * @returns {Promise<T>|Promise}
     */
    public unsubscribe(topic: string): Promise<any> {
        let self = this;
        return new Promise((resolve, reject) => {
            this.client.unsubscribe(topic, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(self.client);
                }
            });
        });
    }

    public publish(topic: string, message: string): Promise<any> {
        let self = this;
        return new Promise((resolve, reject) => {
            this.client.publish(topic, message, {qos: 0}, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(self.client);
                }
            });
        });
    }

    public disconnect(): Promise<any> {
        let self = this;
        return new Promise((resolve, reject) => {
            this.client.end(true, () => {

                TopicMessagingService.onServiceAvailableSubject.next(false);
                resolve(self.client);
            });
        });
    }
}
