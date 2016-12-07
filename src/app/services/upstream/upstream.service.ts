/**
 * Created by johntsinonis on 11/10/16.
 */
import {Injectable} from "@angular/core";
import {Network} from 'ionic-native';
import {CommonDataModel} from "../../models/common-data.model";
import {CommonDataService} from "../common-data.service";

@Injectable()
/**
 * Contains several factory methods that need to be implemented by the child classes
 */
export class UpstreamService {
    protected data: CommonDataModel;

    constructor(commonDataService: CommonDataService) {
        this.data = commonDataService.data

        this.init();
    }

    /**
     * If device connects to network, push any locally stored changes to the upstream service
     */
    private init() {
        Network.onConnect().subscribe(() => {
            console.log('Pushing local changes ... ');
            this.pushLocalChanges();
        });
    }

    sendData(param: any): Promise<any> {
        return undefined;
    }

    pushLocalChanges(): Promise<any> {
        return undefined;
    }

    connect(): Promise<any> {
        return undefined;
    }

    disconnect(): Promise<any> {
        return undefined;
    }

}
