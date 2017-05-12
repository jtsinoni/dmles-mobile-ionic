import {Injectable} from "@angular/core";
import {Network} from 'ionic-native';
import {MessagingDataModel} from "../../models/messaging-data.model";
import {MessagingDataService} from "../messaging-data.service";
import {LoggerService} from "../logger/logger-service";


/**
 * Contains several factory methods that need to be implemented by the child classes
 */
@Injectable()
export class UpstreamService {
    private serviceName = "Upstream Service";
    protected data: MessagingDataModel;

    constructor(public messagingDataService: MessagingDataService, public log: LoggerService) {
        this.data = messagingDataService.messagingDataModel

        this.init();
    }

    /**
     * If device connects to network, push any locally stored changes to the upstream service
     */
    private init() {
        this.log.debug(`${this.serviceName} - Start`);

        Network.onConnect().subscribe(() => {
            this.connect()
                .then(() => {
                    this.log.info('Pushing local changes ... ');
                    this.pushLocalChanges();
                })
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
