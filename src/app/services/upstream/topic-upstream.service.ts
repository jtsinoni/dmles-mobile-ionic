import {TopicMessagingService} from "../topic-messaging.service";
import {NetworkService} from "../network.service";
import {LoggerService} from "../logger/logger-service";
import {Network} from "ionic-native";
import {MessagingModel} from "../../models/messaging.model";
import {BaseDataTableModel} from "../../models/base-data-table.model";
import {BaseDatabaseService} from "../base-database.service";
import {AppConfigConstants} from "../../constants/app-config.constants";

export abstract class TopicUpstreamService<D extends BaseDatabaseService<BaseDataTableModel>> {
    protected serviceName = "TopicUpstreamService Service";
    private serviceAvailable: boolean = false;

    constructor(protected topicMessagingService: TopicMessagingService,
                protected networkService: NetworkService,
                protected databaseService: D,
                public messagingModel: MessagingModel,
                public log: LoggerService) {

        TopicMessagingService.onServiceAvailable().subscribe((results) => {
            this.log.info(`TopicUpstreamService:connected => ${results}`);
            this.serviceAvailable = results;
        });

        this.init();
    }

    /**
     * If device connects to network, push any locally stored changes to the upstream service
     */
    private init() {
        this.log.debug(`${this.serviceName} - Start`);

        // Attempt to connect to messaging server if connect flag is true
        if (AppConfigConstants.messagingServer.connect) {
            this.connect()
                .then((client) => {
                    if (client.connected) {
                        this.log.debug(`Received connect event, Client ID: ${client.options.clientId}, connected: ${client.connected}`);
                    }
                })
                .catch((error) => {
                    this.log.error(error);
                })
        }

        Network.onConnect().subscribe(() => {
            this.connect()
                .then(() => {
                    this.pushLocalChanges();
                })
                .catch((error) => {
                    this.log.error(error);
                })
        });
    }

    /**
     * Check if already connected, if not, create connection and subscribe.
     * @returns @returns {Promise<any>} MQTT client
     */
    public connect(): Promise<any> {
        let localClient = this.topicMessagingService.client;
        if(this.clientConnected()) {
            this.log.warn(`Client already connected: Client ID: ${localClient.options.clientId}`);
            return Promise.resolve(localClient);
        } else {
            return this.clientConnection()
                .then(this.subscribe)
                .catch((error) => {
                    this.log.error(error);
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
                    this.log.error(error);
                })
        } else {
            let message = `Client already disconnected`;
            if(localClient) {
                message = message + `: Client ID: ${localClient.options.clientId}`;
            }
            this.log.warn(message);
            return Promise.resolve(localClient);
        }
    }

    public pushLocalChanges(): Promise<any> {
        return Promise.resolve(this.serviceAvailable)
            .then((connected) => {
                if(!connected) {
                    throw new Error("NotConnected");
                } else {
                    this.log.info('Pushing local changes ... ');
                    return this.topicMessagingService.client;
                }
            })
            .then(this.findCachedData)
            .then(this.publishMany)
            .then(this.deleteCachedData)
            .then((client) => {
                // this.storeDataModel.badgeCount = 0;
                // this.forwardDataModel.pushedChanges = client.items;

                return client;
            })
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
    protected sendData(param: any): Promise<any> {
        if(this.networkService.isConnected && this.serviceAvailable) {
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
                client.message = JSON.stringify(message);
                return client;
            })
            .then(this.publish)
            .catch((error) => {
                this.log.error(error);
            })
    }

    /**
     * Sends data to local cache
     * @param message
     * @returns Promise<number>
     */
    private sendDataLocal(message: any): Promise<number> {
        //return this.databaseService.put(new StoreDataTableModel(JSON.stringify(message), message.id))
        return this.databaseService.put(message)
            .then((id)=> {
                this.log.debug(`Added => ${message} with id => ${id} to IndexedDB`)
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
    private findCachedData(client: any): Promise<any> {
        return client.databaseService.getAll()
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
        return client.databaseService.deleteAll()
            .then(() => {
                client.log.info(`Removed ${client.items.length} messages from local storage`);
                return client;
            })
            .catch((error) => {
                client.log.error(error);
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
                    client.log.info(`Subscribing to Topic: ${element.topic}, client: ${client.options.clientId}`);
                });
                return client;
            })
            .catch((error) => {
                client.log.error(error);
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
                client.log.info(`Unsubscribing from Topic: ${results.topic}, client: ${results.options.clientId}`);
                return results;
            })
            .catch((error) => {
                client.log.error(error);
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
                client.log.log(`Publishing message: ${client.message}  to Topic: ${client.topic}`);
                return client;
            })
            .catch((error) => {
                client.log.error(error);
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
                client.log.info(`Published ${client.items.length} messages to Topic: ${client.topic}`);
                return client;
            })
            .catch((error) => {
                client.log.error(error);
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
                client.log.error(error);
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
        let host = this.messagingModel.host;
        let port = this.messagingModel.port;
        let protocol = this.messagingModel.protocol;

        return new Promise((resolve, reject) => {
            // First check for network connectivity
            if(this.networkService.isConnected) {
                let localClient  = this.topicMessagingService.client;

                // Second, check if already connected, if not make new Connection
                if(localClient && localClient.connected) {
                    resolve(localClient);
                } else {
                    this.topicMessagingService.connect(protocol, host, port)
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
        client.host = this.messagingModel.host;
        client.port = this.messagingModel.port;
        client.topic = this.messagingModel.topic;
        client.topicMessagingService = this.topicMessagingService;
        client.databaseService = this.databaseService;
        client.networkService = this.networkService;
        client.log = this.log;
        if (message) {
            client.message = message;
        }

        return client;
    }
}
