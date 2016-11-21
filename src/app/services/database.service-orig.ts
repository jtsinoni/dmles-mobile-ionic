/**
 * Created by johntsinonis on 11/8/16.
 */
import Dexie from 'dexie';

export class DatabaseApp extends Dexie {

    // Declare implicit table properties.
    // (just to inform Typescript. Instanciated by Dexie in stores() method)
    //contacts: Dexie.Table<Message, number>; // number = type of the primkey
    //...other tables goes here...

    constructor () {
        super("dmles-mobile-dt-ionic");
        var db = this;

        db.version(1).stores({
            messages: '++id, message'
        });

        // Open it
        db.open().catch(function (e) {
            //alert ("Open failed: " + e);
            console.error("Open failed: " + e.stack);
        });
    }
}

export var db = new DatabaseApp();
