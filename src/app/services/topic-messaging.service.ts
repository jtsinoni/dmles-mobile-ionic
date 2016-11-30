/**
 * Created by johntsinonis on 11/11/16.
 */
import {Injectable}    from '@angular/core';

import MQTT from 'mqtt';
import {CommonDataModel} from "../models/common-data.model";
import {CommonDataService} from "./common-data.service";
import {ConnectivityService} from "./connectivity.service";

@Injectable()
export class TopicMessagingService {
    public data: CommonDataModel;
    public client: any;

    constructor(private commonDataService: CommonDataService,
                private connectivityService: ConnectivityService) {
        this.data = commonDataService.data;
    }

    private canConnect(client?: any, topic?: string): boolean {
        if (client) {
            this.data.client = client;
        }

        if (topic) {
            this.data.topic = topic;
        }

        if(!this.connectivityService.isConnected) {
            console.error('Network disconnected.');
            return false;
        }

        if (!this.data.client) {
            console.error('Client connection needs to be made first.');
            return false;
        }
        return true;
    }

    public connect(host?: string, port?: number) {
        if (host) {
            this.data.host = host;
        }

        if (port) {
            this.data.port = port;
        }

        this.data.client = MQTT.connect(`mqtt://${this.data.host}:${this.data.port}`);

        //this.subscribe();
        //this.publish("Hello world");
        //this.unsubscribe();
        //this.disconnect();
        //console.log("MQTT Client" + this.data.client);
        // return
        return this.data.client;
    }

    public subscribe(client?: any, topic?: string) {

        if (this.canConnect(client, topic)) {
            this.data.client.subscribe(this.data.topic, {qos: 1}, function (err, granted) {
                if (err) {
                    console.error(err);
                } else {
                    //console.log('called subscribe service');
                }
            });
        }
    }

    public unsubscribe(client?: any, topic?: string) {
        if (this.canConnect(client, topic)) {
            this.data.client.unsubscribe(this.data.topic, function (err) {
                if (err) {
                    console.error(err);
                } else {
                    //console.log('called unsubscribe service');
                }
            });
        }
    }

    public publish(message: string, client?: any, topic?: string) {
        if (this.canConnect(client, topic)) {
            this.data.client.publish(this.data.topic, message, {qos: 1}, function (err) {
                if (err) {
                    console.error(err);
                } else {
                    //console.log('called publish service');
                }
            });
        }
    }

    public disconnect() {
        if (this.canConnect(this.data.client)) {
            this.data.client.end(true, function () {
                //this.data.client.options.clientId = undefined;
                //this.data.client.connected = false;
                console.log(`Client disconnecting: ${this.data.client.disconnecting}`);
            }.bind(this));  // without, 'this', would be null
        }
        return this.data.client;
    }

    public isConnected(client?: any): boolean {
        if (this.canConnect(client)) {
            return this.data.client.connected;
        }
        return false;
    }
}
