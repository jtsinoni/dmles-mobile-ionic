import {Injectable}    from '@angular/core';

import MQTT from 'mqtt';
import {CommonDataModel} from "../models/common-data.model";
import {CommonDataService} from "./common-data.service";
import {Subject, Observable} from "rxjs";
import {MessagingModel} from "../models/messaging.model";
import {LoggerService} from "./logger/logger-service";

@Injectable()
export class TopicMessagingService {
    private serviceName: string = "TopicMessaging Service";

    public client: any;
    private static onServiceAvailableSubject: Subject<any> = new Subject();
    private static onTryToConnectSubject: Subject<any> = new Subject();
    private static onReconnectAttemptsSubject: Subject<any> = new Subject();

    private dataModel: CommonDataModel;
    private messagingModel: MessagingModel;

    constructor(private commonDataService: CommonDataService,
                private log: LoggerService) {
        this.log.debug(`${this.serviceName} - Start`);

        this.dataModel = commonDataService.data;
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
     * @param host
     * @param port
     * @returns {Promise<T>|Promise}
     */
    public connect(host: string, port: number): Promise<any> {

        return new Promise((resolve, reject) => {
            // reconnectPeriod: 2 (default), reconnect every 2 seconds until reconnectAttempts has reached
            this.client = MQTT.connect(`mqtt://${host}:${port}`, {reconnectPeriod: this.messagingModel.reconnectPeriod});

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

                if(tries == this.dataModel.reconnectAttempts) {
                    this.disconnect();
                    let message = `Stopped retrying to get a connection after ${this.dataModel.reconnectAttempts} attempts`;
                    this.log.info(message);

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
            this.client.publish(topic, message, {qos: 1}, function (err) {
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
