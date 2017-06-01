import {TopicMessagingService} from "../topic-messaging.service";
import {LoggerService} from "../logger/logger-service";
import {BaseDataTableModel} from "../../models/base-data-table.model";
import {BaseDatabaseService} from "../database/base-database.service";
import {Network} from "ionic-native";
import {Observable, Subject} from "rxjs";
import {UtilService} from "../../common/services/util.service";
import {AppInjector} from "../../app.module";
import {NetworkService} from "../network.service";

export abstract class TopicUpstreamService<D extends BaseDatabaseService<BaseDataTableModel>> {
    private static onServiceAvailableSubject: Subject<any> = new Subject();
    private static onTryToConnectSubject: Subject<any> = new Subject();
    private static onReconnectAttemptsSubject: Subject<any> = new Subject();

    protected client: any;
    protected clientId: string;
    protected serviceName = "TopicUpstreamService Service";
    protected utilService: UtilService;
    private networkService: NetworkService;

    constructor(protected topicMessagingService: TopicMessagingService,
                protected databaseService: D,
                protected topic: string,
                public log: LoggerService) {
        this.utilService = AppInjector.get(UtilService);
        this.networkService = AppInjector.get(NetworkService);

        this.setup();
    }

    abstract setup();

    public static onServiceAvailable(): Observable<any> {
        return (TopicUpstreamService.onServiceAvailableSubject.asObservable());
    }

    public static onTryToConnect(): Observable<any> {
        return (TopicUpstreamService.onTryToConnectSubject.asObservable());
    }

    public static onReconnectAttempts(): Observable<any> {
        return (TopicUpstreamService.onReconnectAttemptsSubject.asObservable());
    }

    protected start() {
        if(this.networkService.isConnected) {
            this.startHelper();
        }

        Network.onConnect().subscribe(() => {
            this.startHelper();
        });

        Network.onDisconnect().subscribe(() => {
            this.disconnect()
                .then((client) => {
                    this.client = client;
                    this.log.debug(`Received disconnect event, Client ID: ${client.options.clientId}, connected: ${client.connected}`);
                })
                .catch((error) => {
                    this.log.error(error);
                })
        });
    }

    private startHelper(){
        this.connect(undefined, undefined, undefined, this.clientId)
            .then((client) => {
                this.client = client;
                if(client.connected) {
                    return client;
                } else {
                    throw new Error("Client not connected to messaging server.");
                }
            })
            .then((client) => {
                this.pushLocalChanges();
            })
            .catch((error) => {
                this.log.error(error);
            })
    }

    /**
     * Create connection
     * @param protocol
     * @param host
     * @param port
     * @returns @returns {Promise<any>} MQTT client
     */
    public connect(protocol?: number, host?: string, port?: number, clientId?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.topicMessagingService.connect(protocol, host, port, clientId)
                .then((client) => {
                    resolve(client);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * Disconnect client from broker
     * @returns {Promise<any>} may contain undefined
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
    }

    /**
     * Push local changes t messaging broker
     * @returns {Promise<Array[T]>} of items cached
     */
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
    public sendData(data: any): Promise<any> {
        if(this.clientConnected()) {
            // Connect to Host and Publish messages to Topic
            return this.sendDataServer(JSON.stringify(data));

        } else {
            // Not connected, need to cache data
            return this.sendDataLocal(data);
        }
    }

    /**
     * Sends data to the messaging server
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

    private clientConnected(): boolean {
        return (this.client && this.client.connected) ? true : false;
    }
}
