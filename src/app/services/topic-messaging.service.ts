/**
 * Created by johntsinonis on 11/11/16.
 */
import {Injectable}    from '@angular/core';

import MQTT from 'mqtt';
import {CommonDataModel} from "../models/common-data.model";
import {CommonDataService} from "./common-data.service";

@Injectable()
export class TopicMessagingService {
    public client: any;
    private dataModel: CommonDataModel;

    constructor(private commonDataService: CommonDataService) {
        this.dataModel = commonDataService.data;
    }

    /**
     * Connects to a messaging broker
     * @param host
     * @param port
     * @returns {Promise<T>|Promise}
     */
    public connect(host: string, port: number): Promise<any> {
        /*
         The keepalive interval is 60 seconds
         Clean Session is true
         The message delivery retry interval is 15 seconds
         The connection timeout period is 30 seconds
         */
        return new Promise((resolve, reject) => {
            // reconnectPeriod: 0, do not try to reconnect if messaging server is not available
            this.client = MQTT.connect(`mqtt://${host}:${port}`, {reconnectPeriod: 2000});
            //this.client = MQTT.connect(`mqtt://${host}:${port}`);
            this.client.on('connect', () => {

                console.log(`Received online event, Client ID: ${this.client.options.clientId}, connected: ${this.client.connected}`);
                resolve(this.client);
            });

            this.client.on('error', (error) => {

                console.error(`Received error event, Client ID: ${this.client.options.clientId}, connected: ${this.client.connected}`);
                resolve(this.client);
            });

            this.client.on('offline', (results) => {

                console.warn(`Received offline event, Client ID: ${this.client.options.clientId}, connected: ${this.client.connected}`);
                resolve(this.client);
            });


            //stop trying to reconnect after 10 attempts
            let origTryCount = this.dataModel.reconnectAttempts;
            let tries = origTryCount;

            this.client.on('reconnect', (results) => {
                tries--;
                if(tries == 0) {
                    this.disconnect();
                    console.log(`Stopped retrying to get a connection after ${origTryCount} attempts, results: ${results}`);
                }

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
                resolve(self.client);
            });
        });
    }
}
