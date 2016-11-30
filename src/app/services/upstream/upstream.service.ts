import {Injectable} from "@angular/core";
import Dexie from "dexie";
import {Network} from 'ionic-native';
import {CommonDataModel} from "../../models/common-data.model";
import {CommonDataService} from "../common-data.service";
/**
 * Created by johntsinonis on 11/10/16.
 */
@Injectable()
export class UpstreamService {
    protected data: CommonDataModel;

    constructor(commonDataService: CommonDataService) {
        this.data = commonDataService.data

        this.init();
    }

    private init() {
        Network.onConnect().subscribe(() => {
            console.log('Pushing local changes ... ');
            this.pushLocalChanges()
                .catch((reason) => {
                    if(reason.message === "NoItems") {
                        console.log("The are no items in local storage");
                    } else {
                        console.error(reason);
                    }
                });
        });
    }


    sendData(param: any): Dexie.Promise<any> {
        return undefined;
    }

    pushLocalChanges(): Dexie.Promise<any> {
        return undefined;
    }

    connect(): Dexie.Promise<any> {
        return undefined;
    }

    disconnect(): Dexie.Promise<any> {
        return undefined;
    }

}
