/**
 * Created by johntsinonis on 11/8/16.
 */
import { Injectable }    from '@angular/core';

import Dexie from 'dexie';
import {MQTTModel} from "../models/mqtt.model";

@Injectable()
export class DatabaseService extends Dexie {
    private db: DatabaseService;
    public data: MQTTModel;

    // Declare implicit table properties.
    // (just to inform Typescript. Instanciated by Dexie in stores() method)
    //contacts: Dexie.Table<MQTTModel, number>; // number = type of the primkey
    //...other tables goes here...

    constructor () {
        super("dmles-mobile-dt-ionic");
        this.db = this;
        this.data = new MQTTModel();

        this.db.version(1).stores({
            messages: '++id, message'
        });

        // Open it
        this.db.open().catch(function (e) {
            //alert ("Open failed: " + e);
            console.error("Open failed: " + e.stack);
        });
    }


}

//export var db = new DatabaseService();