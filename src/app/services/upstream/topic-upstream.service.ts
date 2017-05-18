import {TopicMessagingService} from "../topic-messaging.service";
//import {NetworkService} from "../network.service";
import {LoggerService} from "../logger/logger-service";
//import {Network} from "ionic-native";
import {MessagingModel} from "../../models/messaging.model";
import {BaseDataTableModel} from "../../models/base-data-table.model";
import {BaseDatabaseService} from "../base-database.service";
//import {AppConfigConstants} from "../../constants/app-config.constants";

export abstract class TopicUpstreamService<D extends BaseDatabaseService<BaseDataTableModel>> {
    protected client: any;
    protected topic: string;
    protected serviceName = "TopicUpstreamService Service";
    //private serviceAvailable: boolean = false;

    constructor(protected topicMessagingService: TopicMessagingService,
//                protected networkService: NetworkService,
                protected databaseService: D,
                public messagingModel: MessagingModel,
                public log: LoggerService) {

        // TopicMessagingService.onServiceAvailable().subscribe((results) => {
        //     this.log.info(`TopicUpstreamService:connected => ${results}`);
        //     this.serviceAvailable = results;
        // });

        this.init();
    }

    abstract init();

    // /**
    //  * If device connects to network, push any locally stored changes to the upstream service
    //  */
    // private init() {
    //     this.log.debug(`${this.serviceName} - Start`);
    //
    //     // // Attempt to connect to messaging server if connect flag is true
    //     // if (AppConfigConstants.messagingServer.connect) {
    //     //     this.connect()
    //     //         .then((client) => {
    //     //             if (client.connected) {
    //     //                 this.log.debug(`Received connect event, Client ID: ${client.options.clientId}, connected: ${client.connected}`);
    //     //             }
    //     //         })
    //     //         .catch((error) => {
    //     //             this.log.error(error);
    //     //         })
    //     // }
    //     //
    //     // Network.onConnect().subscribe(() => {
    //     //     this.connect()
    //     //         .then(() => {
    //     //             this.pushLocalChanges();
    //     //         })
    //     //         .catch((error) => {
    //     //             this.log.error(error);
    //     //         })
    //     // });
    // }

    /**
     * Check if already connected, if not, create connection and subscribe.
     * @returns @returns {Promise<any>} MQTT client
     */
    public connect(protocol?: number, host?: string, port?: number): Promise<any> {
        // let localClient = this.topicMessagingService.client;
        // if(this.clientConnected()) {
        //     this.log.warn(`Client already connected: Client ID: ${localClient.options.clientId}`);
        //     return Promise.resolve(localClient);
        // } else {
        //     return this.clientConnection()
        //         .then(this.subscribe)
        //         .catch((error) => {
        //             this.log.error(error);
        //         });
        // }

        return new Promise((resolve, reject) => {
            this.topicMessagingService.connect(protocol, host, port)
                .then((client) => {
                    resolve(client);
                })
                .catch((error) => {
                    reject(error);
                });
        });

        //
        //     // First check for network connectivity
        //     if (this.networkService.isConnected) {
        //         let localClient = this.topicMessagingService.client;
        //
        //         // Second, check if already connected, if not make new Connection
        //         if (localClient && localClient.connected) {
        //             resolve(localClient);
        //         } else {
        //             this.topicMessagingService.connect(protocol, host, port)
        //                 .then((client) => {
        //                     resolve(this.adornClient(client));
        //                 })
        //                 .catch((error) => {
        //                     reject(error);
        //                 });
        //         }
        //     } else {
        //         reject(`Failed to connect to host: ${host} port: ${port}, no network connection.`);
        //     }
        // }
    }

    /**
     * Check to see if already disconnected, no point in disconnecting, if already "disconnected"
     * @returns {Promise<any>} may contain undefined, if never connected, then try to disconnect again
     */
    public disconnect(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.topicMessagingService.disconnect(this.client)
                .then((client) => {
                    resolve(client);
                })
                .catch((error) => {
                    reject(error);
                });
        });

        // let localClient = this.topicMessagingService.client;
        // if(this.clientConnected()) {
        //     return Promise.resolve(localClient)
        //         .then(this.unsubscribe)
        //         .then(this.clientDisconnection)
        //         .catch((error) => {
        //             this.log.error(error);
        //         })
        // } else {
        //     let message = `Client already disconnected`;
        //     if(localClient) {
        //         message = message + `: Client ID: ${localClient.options.clientId}`;
        //     }
        //     this.log.warn(message);
        //     return Promise.resolve(localClient);
        // }
    }

    public pushLocalChanges(): Promise<any> {
        return Promise.resolve(this.clientConnected())
            .then((connected) => {
                if(!connected) {
                    throw new Error("NotConnected");
                } else {
                    this.log.info('Pushing local changes ... ');
                    return this;
                }
            })
            .then(this.findCachedData)
            .then(this.publishMany)
            .then(this.deleteCachedData)
            .catch((reason) => {
                if(reason.message === "NoItems") {
                    this.log.debug("The are no items in local storage");
                } else if(reason.message === "NotConnected") {
                    this.log.warn("Client not connected to Messaging Server");
                } else {
                    this.log.error(reason);
                }
            });
    }

    /**
     * Sends data to local cache or an upstream service
     * @param param
     * @returns {Promise<any>}
     */
    protected sendData(data: any): Promise<any> {
        if(this.clientConnected()) {
            // Connect to Host and Publish messages to Topic
            return this.sendDataServer(JSON.stringify(data));

        } else {
            // Not connected, need to cache data
            return this.sendDataLocal(data);
        }
    }

    /**
     * Sends data to the messaginf server
     * @param data
     * @returns a Promise with the client
     */
    private sendDataServer(data: any): Promise<any> {
        return this.publish(data)
            .then((client) => {
                return client;
            })
            .catch((error) => {
                this.log.error(error);
            })
    }

    /**
     * Sends data to local cache
     * @param message
     * @returns a Promise<number> with the primary id
     */
    private sendDataLocal(data: any): Promise<number> {
        return this.databaseService.put(data)
            .then((id)=> {
                this.log.debug(`Added => ${data} with id => ${id} to IndexedDB`)
                return id;
            })
            .catch((error) => {
                this.log.error(error);
            });
    }

    /**
     * Finds data that is cached
     * @param client
     * @returns {Promise<any>|Thenable<any>|Promise<U>|Thenable<U>|PromiseLike<TResult>}
     */
    /**
     * Finds data that is cached
     * @returns a Promise<Array[T]> with the items in local cache
     */
    private findCachedData(self: any): Promise<any> {
        return self.databaseService.getAll()
            .then((items) => {
                if (items.length > 0) {
                    return {self:self, items:items};
                } else {
                    throw new Error("NoItems");
                }
            });
    }

    /**
     * Deletes data that is cached
     * @param items
     * @returns a Promise<Array[T]> with the items that were deleted from local cache
     */
    private deleteCachedData(args: any): Promise<any> {
        let items = args.items;
        let self = args.self;
        return self.databaseService.deleteAll()
            .then(() => {
                self.log.info(`Removed ${items.length} messages from local storage`);
                return items;
            })
            .catch((error) => {
                self.log.error(error);
            });
    }

    /**
     * Subscribe to Topic
     * @returns a Promise with the client
     */
    protected subscribe(): Promise<any> {
        return this.topicMessagingService.subscribe(this.client, this.topic)
            .then((client) => {
                this.log.info(`Subscribed to Topic: ${this.topic}, client: ${client.options.clientId}`);
                return client;
            })
            .catch((error) => {
                this.log.error(error);
            });
    }

    /**
     * Unsubscribe from Topic
     * @returns a Promise with the client
     */
    protected unsubscribe() {
        return this.topicMessagingService.unsubscribe(this.client, this.topic)
            .then((client) => {
                this.log.debug(`Unsubscribed from Topic: ${this.topic}, client: ${client.options.clientId}`);
                return client;
            })
            .catch((error) => {
                this.log.error(error);
            });
    }

    /**
     * Publish data to a Topic
     * @param data
     * @returns a Promise with the client
     */
    private publish(data: any): Promise<any> {
        return this.topicMessagingService.publish(this.client, this.topic, data)
            .then((client) => {
                this.log.log(`Publishing message: ${data}  to Topic: ${this.topic}`);
                return client;
            })
            .catch((error) => {
                this.log.error(error);
            });
    }

    /**
     * Publish multiple messages to Topic
     * @param items
     * @returns a Promise<Array[T]> with the all the items that were published
     */
    private publishMany(args: any): Promise<any> {
        let promises = [];
        let items = args.items;
        let self = args.self;

        items.forEach((item) => {
            let promise = self.topicMessagingService.publish(self.client, self.topic, JSON.stringify(item));
            promises.push(promise);
        });

        return Promise.all(promises)
            .then((results) => {
                self.log.info(`Published ${items.length} messages to Topic: ${self.topic}`);
                return {self:self, items:items};
            })
            .catch((error) => {
                self.log.error(error);
            });
    }

    // /**
    //  * Disconnect client from messaging broker
    //  * @param client
    //  * @returns {Promise<U|R>}
    //  */
    // private clientDisconnection(client: any): Promise<any> {
    //     return client.topicMessagingService.disconnect()
    //         .then(() => {
    //             return client;
    //         })
    //         .catch((error) => {
    //             client.log.error(error);
    //         });
    // }

    // /**
    //  * This is two-fold, first checks if a cellular network exists, then checks if the client has an
    //  * existing connection to a messaging broker.  If the the client has a connection, just return the
    //  * same connection, else create a new connection to the messaging broker.
    //  *
    //  * @returns {Promise<T>|Promise}
    //  */
    // private clientConnection(): Promise<any> {
    //     let host = this.messagingModel.host;
    //     let port = this.messagingModel.port;
    //     let protocol = this.messagingModel.protocol;
    //
    //     return new Promise((resolve, reject) => {
    //         // First check for network connectivity
    //         if(this.networkService.isConnected) {
    //             let localClient  = this.topicMessagingService.client;
    //
    //             // Second, check if already connected, if not make new Connection
    //             if(localClient && localClient.connected) {
    //                 resolve(localClient);
    //             } else {
    //                 this.topicMessagingService.connect(protocol, host, port)
    //                     .then((client) => {
    //                         resolve(this.adornClient(client));
    //                     })
    //                     .catch((error) => {
    //                         reject(error);
    //                     });
    //             }
    //         } else {
    //             reject(`Failed to connect to host: ${host} port: ${port}, no network connection.`);
    //         }
    //     });
    // }

    /**
     * Returns true if the client is connected to a messaging broker, else false
     * @returns {boolean}
     */
    private clientConnected(): boolean {

        return (this.client && this.client.connected) ? true : false;
        // if(this.topicMessagingService.client && this.topicMessagingService.client.connected) {
        //     return true;
        // }
        // return false;
    }

    // /**
    //  * Adds additional services to the client
    //  * @param client
    //  * @param message
    //  * @returns {any}
    //  */
    // private adornClient(client: any, message?: any): any {
    //     client.host = this.messagingModel.host;
    //     client.port = this.messagingModel.port;
    //     client.topic = this.messagingModel.topic;
    //     client.topicMessagingService = this.topicMessagingService;
    //     client.databaseService = this.databaseService;
    //     client.networkService = this.networkService;
    //     client.log = this.log;
    //     if (message) {
    //         client.message = message;
    //     }
    //
    //     return client;
    // }
}
