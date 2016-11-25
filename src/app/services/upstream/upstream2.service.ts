import {Injectable} from "@angular/core";
import {CommonDataService} from "../common-data.service";
import {CommonDataModel} from "../../models/common-data.model";
import {DatabaseService} from "../database.service";
import {Network} from 'ionic-native';
/**
 * Created by johntsinonis on 11/10/16.
 */
@Injectable()
export class UpstreamService {
    protected data: CommonDataModel;
    constructor(private commonDataService: CommonDataService,
                protected databaseService: DatabaseService) {
        this.data = commonDataService.data;

        Network.onDisconnect().subscribe(() => {
            console.log('network disconnected');
            //this.isConnected = false;
        });
    }

    sendData(param?: any): boolean {
        return undefined;
    }
}
