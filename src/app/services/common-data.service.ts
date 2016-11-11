/**
 * Created by johntsinonis on 11/11/16.
 */
import { Injectable }    from '@angular/core';
import {MQTTModel} from "../models/mqtt.model";

@Injectable()
export class CommonDataService {
    public data: MQTTModel;
    constructor () {
        this.data = new MQTTModel();
    }
}
