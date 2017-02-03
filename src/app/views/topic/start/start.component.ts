import {Component, Input, OnInit} from "@angular/core";
import {Network} from 'ionic-native';
import {Platform} from "ionic-angular";

import {DatabaseService} from "../../../services/database.service";
import {UpstreamService} from '../../../services/upstream/upstream.service';
import {CommonDataModel} from "../../../models/common-data.model";
import {TopicMessagingService} from "../../../services/topic-messaging.service";
import {CommonDataService} from "../../../services/common-data.service";
import {StoreDataModel} from "../../../models/store-data.model";
import {NetworkService} from "../../../services/network.service";
import {OAuthService} from "../../../services/oauth.service";
import {LoggerService} from "../../../services/logger/logger-service";
import {AppConfigConstants} from "../../../constants/app-config.constants";
import {JSONWebTokenService} from "../../../services/jason-web-token.service";

declare var window: any;

@Component({
    templateUrl: './start.component.html',
    selector: 'start-view'
})
export class StartComponent implements OnInit {

    @Input()
    public data: CommonDataModel;

    @Input()
    public isConnected: boolean = false;

    @Input()
    public storeDataModel: StoreDataModel;

    constructor(private platform: Platform,
                private databaseService: DatabaseService,
                private upstreamService: UpstreamService,
                private commonDataService: CommonDataService,
                public connectivityService: NetworkService,
                private OAuthService: OAuthService,
                private log: LoggerService,
                private jwtService: JSONWebTokenService) {
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
            this.log.info(`TopicMessagingService.onTryToConnect() => ${results}`);
            this.isConnected = results;
        });

        TopicMessagingService.onReconnectAttempts().subscribe((results) => {
            //console.log(`TopicMessagingService.onTryToConnect() => ${results}`);
            //this.isConnected = results;
            this.addLogMessage(results.message);
        });

        TopicMessagingService.onServiceAvailable().subscribe((connected) => {
            if(connected) {
                this.storeDataModel.disableConnectButton = true;
                this.storeDataModel.disableDisconnectButton = false;
            } else {
                this.storeDataModel.disableConnectButton = false;
                this.storeDataModel.disableDisconnectButton = true;
            }

            this.storeDataModel.isServiceAvailable = connected;
        });
    }

    ngOnInit(): void {
        this.updateCount();
    }

    public login() {
        this.platform.ready()
            .then(() => {
                this.OAuthService.getToken(AppConfigConstants.OAuth.userName)
                    .subscribe(
                        (token) => {
                            let decodedToken = this.jwtService.decodeToken(token);
                            let message = `OAuth Token Decoded => ${JSON.stringify(decodedToken)}`;

                            this.addLogMessage(message);
                        },
                        (error) => {
                            let message = `Error => ${error}`;
                            this.logErrorMessage(message);
                        },
                        () => {
                            let message = `Authentication Complete`;
                            this.addLogMessage(message);
                        }
                    )
            })
            .catch((error) => {
                let message = `Error => ${error}`;
                this.logErrorMessage(message);
            });
    }

    public connect() {
        this.upstreamService.connect()
            .then((client) => {
                //let message = "Received connect event, data => " + JSON.stringify(results);
                let message = `Received connect event, Client ID: ${client.options.clientId}, connected: ${client.connected}`;

                this.addLogMessage(message);
                this.upstreamService.pushLocalChanges()
                    .then((client) => {
                        if(client && client.items) {
                            message = `Published ${client.items.length} messages to Topic: ${client.topic}`;
                            this.addLogMessage(message);
                        }
                    })
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

        // let notification = {
        //     title: 'Topic Notification:',
        //     text: message,
        //     data: { message }
        // };
        //
        // this.LoggerService.addNotification([notification]);
    }

    private addLogMessage(message: string) {
        this.log.debug(message);
        this.appendLogMessage(message);
    }

    private logErrorMessage(error: string) {
        this.log.error(error);
        this.appendLogMessage(error);
    }
}


