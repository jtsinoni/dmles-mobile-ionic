/**
 * Created by johntsinonis on 11/9/16.
 */
import {Component, Input, OnInit} from "@angular/core";
import {Network} from 'ionic-native';
import {DatabaseService} from "../../../services/database.service";
import {UpstreamService} from '../../../services/upstream/upstream.service';
import {CommonDataModel} from "../../../models/common-data.model";
import {TopicMessagingService} from "../../../services/topic-messaging.service";
import {CommonDataService} from "../../../services/common-data.service";
import {StoreDataModel} from "../../../models/store-data.model";
import {NetworkService} from "../../../services/network.service";

@Component({
    templateUrl: 'start.component.html',
    selector: 'start-view'
})
export class StartComponent implements OnInit {
    @Input()
    public data: CommonDataModel;

    @Input()
    public isConnected: boolean = false;

    public disableConnectButton: boolean = false;
    public disableDisconnectButton: boolean = true;
    private isServiceAvailable: boolean = false;

    public storeDataModel: StoreDataModel;

    constructor(private databaseService: DatabaseService,
                private upstreamService: UpstreamService,
                private commonDataService: CommonDataService,
                public connectivityService: NetworkService) {
        this.data = commonDataService.data;
        this.storeDataModel = commonDataService.storeDataModel;
        this.isConnected = connectivityService.isConnected;

        Network.onDisconnect().subscribe(() => {
            this.isConnected = false;
        });

        Network.onConnect().subscribe(() => {
            this.isConnected = true;
        });

        TopicMessagingService.onTryToConnect().subscribe((results) => {
            console.log(`TopicMessagingService.onTryToConnect() => ${results}`);
            this.isConnected = results;
        });

        TopicMessagingService.onServiceAvailable().subscribe((connected) => {
            if(connected) {
                this.disableConnectButton = true;
                this.disableDisconnectButton = false;
            } else {
                this.disableConnectButton = false;
                this.disableDisconnectButton = true;
            }

            this.isServiceAvailable = connected;
        });
    }

    ngOnInit(): void {
        this.updateCount();
        //this.upstreamService.pushLocalChanges();
    }

    public connect() {
        this.upstreamService.connect()
            .then((client) => {
                //let message = "Received connect event, data => " + JSON.stringify(results);
                let message = `Received connect event, Client ID: ${client.options.clientId}, connected: ${client.connected}`;

                this.addLogMessage(message);
                //this.disableConnectButton = true;
                //this.disableDisconnectButton = false;

                this.upstreamService.pushLocalChanges();
            })
            .catch((error) => {
                this.logErrorMessage(error);
            });
    }

    public disconnect() {
        this.upstreamService.disconnect()
            .then((client) => {
                let message = `Received disconnect event`;
                if(client) {
                    message = message + `, Client ID: ${client.options.clientId}, connected: ${client.connected}`;
                }

                this.addLogMessage(message);
                //this.disableConnectButton = false;
                //this.disableDisconnectButton = true;
            })
            .catch((error) => {
                this.logErrorMessage(error);
            });
    }

    public add(data: string) {
        this.upstreamService.sendData(data)
            .then((response) => {
                if(typeof(response) === 'number') {
                    this.updateCount();

                    let logMessage = `Succesfully added: ${data} with row id: ${response}`;
                    this.addLogMessage(logMessage);
                } else {
                    this.addLogMessage(`Sending data to messaging server => ${data}`);
                }

            })
            .catch((error) => {
                this.logErrorMessage(error);
            });
    }

    public clearLogMessages() {
        this.data.messages = '';
    }

    public disabledButtonState(state: boolean): boolean {
        if(this.isConnected) {
            return state;
        } else {
            return true;
        }
    }

    private updateCount() {
        this.databaseService.count()
            .then(count => {
                this.storeDataModel.badgeCount = count;
            })
            .catch((error) => {
                this.logErrorMessage(error);
            });
    }

    private appendLogMessage(message: string) {
        this.data.messages = this.data.messages + message + "\n";
    }

    private addLogMessage(message: string) {
        console.log(message);
        this.appendLogMessage(message);
    }

    private logErrorMessage(error: string) {
        console.error(error);
        this.appendLogMessage(error);
    }
}


