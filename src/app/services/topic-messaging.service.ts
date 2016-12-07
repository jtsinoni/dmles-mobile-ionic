/**
 * Created by johntsinonis on 11/11/16.
 */
import {Injectable}    from '@angular/core';

import MQTT from 'mqtt';

@Injectable()
export class TopicMessagingService {
    public client: any;

    constructor() {
    }

    /**
     * Connects to a messaging broker
     * @param host
     * @param port
     * @returns {Promise<T>|Promise}
     */
    public connect(host: string, port: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client = MQTT.connect(`mqtt://${host}:${port}`);
            this.client.on('connect', () => {
                resolve(this.client);
            });

            this.client.on('error', (error) => {
                reject(error);
            });

            // stop trying to reconnect after 10 attempts
            // let tries = 10;
            // client.on('reconnect', () => {
            //     tries--;
            //     if(tries == 0) {
            //         console.log(`Disconnecting after multiple attempts`);
            //         client.clientDisconnection(true);
            //     }
            // });
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
