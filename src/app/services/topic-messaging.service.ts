/**
 * Created by johntsinonis on 11/11/16.
 */
import { Injectable }    from '@angular/core';

import MQTT from 'mqtt';
import {MQTTModel} from "../models/mqtt.model";
import {CommonDataService} from "./common-data.service";

@Injectable()
export class TopicMessagingService  {
    public data: MQTTModel;

    constructor(private commonDataService: CommonDataService) {
        this.data = commonDataService.data;
    }

    public client() {
        this.data.client = MQTT.connect('mqtt://localhost:61616');
        console.log("MQTT Client" + this.data.client);
    }
}
