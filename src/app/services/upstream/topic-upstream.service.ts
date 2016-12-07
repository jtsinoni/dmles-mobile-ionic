/**
 * Created by johntsinonis on 11/10/16.
 */
import { Injectable }    from '@angular/core';

import { UpstreamService } from './upstream.service'
import {TopicMessagingService} from "../topic-messaging.service";
import {NetworkService} from "../network.service";
import {DatabaseService} from "../database.service";
import {CommonDataService} from "../common-data.service";
import {ForwardDataModel} from "../../models/forward-data.model";
import {StoreDataModel} from "../../models/store-data.model";

@Injectable()
export class TopicUpstreamService extends UpstreamService {
    private forwardDataModel: ForwardDataModel;
    private storeDataModel: StoreDataModel;

    constructor(private topicMessagingService: TopicMessagingService,
                private networkService: NetworkService,
                private databaseService: DatabaseService,
                private commonDataService: CommonDataService) {
        super(commonDataService);

        this.forwardDataModel = commonDataService.forwardDataModel;
        this.storeDataModel = commonDataService.storeDataModel;
    }

    /**
     * Check if already connected, if not, create connection and subscribe.
     * @returns @returns {Promise<any>} MQTT client
     */
    public connect(): Promise<any> {
        let localClient = this.topicMessagingService.client;
        if(this.clientConnected()) {
            console.warn(`Client already connected: Client ID: ${localClient.options.clientId}`);
            return Promise.resolve(localClient);
        } else {
            return this.clientConnection()
                .then(this.subscribe)
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    /**
     * Check to see if already disconnected, no point in disconnecting, if already "disconnected"
     * @returns {Promise<any>} may contain undefined, if never connected, then try to disconnect again
     */
    public disconnect(): Promise<any> {
        let localClient = this.topicMessagingService.client;
        if(this.clientConnected()) {
            return Promise.resolve(localClient)
                .then(this.unsubscribe)
                .then(this.clientDisconnection)
                .catch((error) => {
                    console.error(error);
                })
        } else {
            let message = `Client already disconnected`;
            if(localClient) {
                message = message + `: Client ID: ${localClient.options.clientId}`;
            }
            console.warn(message);
            return Promise.resolve(localClient);
        }
    }

    public pushLocalChanges(): Promise<any> {
        //let self = this;
        return this.clientConnection()
            .then(this.findCachedData)
            .then(this.publishMany)
            .then(this.deleteCachedData)
            .then((client) => {
                this.storeDataModel.badgeCount = 0;
                this.forwardDataModel.pushedChanges = client.items;

                return client;
            })
            .catch((reason) => {
                if(reason.message === "NoItems") {
                    console.log("The are no items in local storage");
                } else {
                    console.error(reason);
                }
            });
    }

    /**
     * Sends data to local cache or an upstream service
     * @param param
     * @returns {Promise<any>}
     */
    public sendData(param: any): Promise<any> {
        if(this.networkService.isConnected) {
            // Connect to Host and Publish messages to Topic
            return this.sendDataServer(param);

        } else {
            // Not connected, need to cache data
            return this.sendDataLocal(param);
        }
    }

    /**
     * Connects to messaging server then sends data
     * @param message
     * @returns {Promise<U|R>}
     */
    private sendDataServer(message: any): Promise<any> {
        return this.clientConnection()
            .then((client) => {
                client.message = message;
                return client;
            })
            .then(this.publish)
            .catch((error) => {
                console.error(error);
            })
    }

    /**
     * Sends data to local cache
     * @param message
     * @returns {Promise<U|R>|Observable<R>|Promise<undefined|R>}
     */
    private sendDataLocal(message: any): Promise<number> {
        return this.databaseService.add(message)
            .then((id)=> {
                return id;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    /**
     * Finds data that is cached
     * @param client
     * @returns {Promise<any>|Thenable<any>|Promise<U>|Thenable<U>|PromiseLike<TResult>}
     */
    private findCachedData(client: any): Promise<any> {
        return client.databaseService.find()
            .then((items) => {
                if (items.length > 0) {
                    client.items = items;
                    return client;
                } else {
                    throw new Error("NoItems");
                }
            })
    }

    /**
     * Deletes data that is cached
     * @param client
     * @returns {Promise<U|R>}
     */
    private deleteCachedData(client: any): Promise<any> {
        // Remove items from local storage
        return client.databaseService.delete()
            .then(() => {
                console.log(`Removed ${client.items.length} messages from local storage`);
                return client;
            })
            .catch((error) => {
                console.error(error);
            });
    }



    /**
     * Subscribe to Topic
     * @param client
     * @returns {Promise<U|R>}
     */
    private subscribe(client: any): Promise<any> {
        return client.topicMessagingService.subscribe(client.topic)
            .then((granted) => {
                granted.forEach((element) => {
                    console.log(`Subscribing to Topic: ${element.topic}, client: ${client.options.clientId}`);
                });
                return client;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    /**
     * Unsubscribe from Topic
     * @param client
     * @returns {Promise<U|R>}
     */
    private unsubscribe(client: any) {
        return client.topicMessagingService.unsubscribe(client.topic)
            .then((results) => {
                console.log(`Unsubscribing from Topic: ${results.topic}, client: ${results.options.clientId}`);
                return results;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    /**
     * Publish message to Topic
     * @param client
     * @returns {Promise<any>}
     */
    private publish(client: any): Promise<any> {
        return client.topicMessagingService.publish(client.topic, client.message)
            .then(() => {
                console.log(`Publishing message: ${client.message}  to Topic: ${client.topic}`);
                return client;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    /**
     * Publish multiple messages to Topic
     * @param client
     * @returns {Promise<U|R>}
     */
    private publishMany(client: any): Promise<any> {
        let promises = [];
        client.items.forEach((item) => {
            let promise = client.topicMessagingService.publish(client.topic, item.data);
            promises.push(promise);
        });

        return Promise.all(promises)
            .then((results) => {
                console.log(`Published ${client.items.length} messages to Topic: ${client.topic}`);
                return client;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    /**
     * Disconnect client from messaging broker
     * @param client
     * @returns {Promise<U|R>}
     */
    private clientDisconnection(client: any): Promise<any> {
        return client.topicMessagingService.disconnect()
            .then(() => {
                return client;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    /**
     * This is two-fold, first checks if a cellular network exists, then checks if the client has an
     * existing connection to a messaging broker.  If the the client has a connection, just return the
     * same connection, else create a new connection to the messaging broker.
     *
     * @returns {Promise<T>|Promise}
     */
    private clientConnection(): Promise<any> {
        let host = this.data.host;
        let port = this.data.port;

        return new Promise((resolve, reject) => {
            // First check for network connectivity
            if(this.networkService.isConnected) {
                let localClient  = this.topicMessagingService.client;

                // Second, check if already connected, if not make new Connection
                if(localClient && localClient.connected) {
                    resolve(localClient);
                } else {
                    this.topicMessagingService.connect(host, port)
                        .then((client) => {
                            resolve(this.adornClient(client));
                        })
                        .catch((error) => {
                            reject(error);
                        });
                }
            } else {
                reject(`Failed to connect to host: ${host} port: ${port}, no network connection.`);
            }
        });
    }

    /**
     * Retruns true if the client is connected to a messaging broker, else false
     * @returns {boolean}
     */
    private clientConnected(): boolean {
        if(this.topicMessagingService.client && this.topicMessagingService.client.connected) {
            return true;
        }
        return false;
    }

    /**
     * Adds additional services to the client
     * @param client
     * @param message
     * @returns {any}
     */
    private adornClient(client: any, message?: any): any {
        client.host = this.data.host;
        client.port = this.data.port;
        client.topic = this.data.topic;
        client.topicMessagingService = this.topicMessagingService;
        client.databaseService = this.databaseService;
        client.networkService = this.networkService;
        if (message) {
            client.message = message;
        }

        return client;
    }
}
