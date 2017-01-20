import {Injectable} from "@angular/core";
import {Network} from 'ionic-native';
import {CommonDataModel} from "../../models/common-data.model";
import {CommonDataService} from "../common-data.service";
import {LoggerService} from "../logger/logger-service";


/**
 * Contains several factory methods that need to be implemented by the child classes
 */
@Injectable()
export class UpstreamService {
    private serviceName = "Upstream Service";
    protected data: CommonDataModel;

    constructor(public commonDataService: CommonDataService, public log: LoggerService) {
        this.data = commonDataService.data

        this.init();
    }

    /**
     * If device connects to network, push any locally stored changes to the upstream service
     */
    private init() {
        this.log.debug(`${this.serviceName} - Start`);

        Network.onConnect().subscribe(() => {
            this.log.info('Pushing local changes ... ');
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
