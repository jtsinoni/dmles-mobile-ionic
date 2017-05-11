import {AppConfigConstants} from "../constants/app-config.constants";
export class MessagingModel {
    topic: string;
    message: string;
    messages: string;
    client: any;
    host: string;
    port: number;
    reconnectAttempts: number;
    reconnectPeriod: number;

    constructor() {
        this.topic = AppConfigConstants.messagingServer.topic;
        this.message = 'Hello DML-ES Mobile!';
        this.messages = '';
        this.host = AppConfigConstants.messagingServer.host;
        this.port = AppConfigConstants.messagingServer.port;
        this.reconnectAttempts = AppConfigConstants.messagingServer.reconnectAttempts; // in seconds
        this.reconnectPeriod = AppConfigConstants.messagingServer.reconnectPeriod; // in milli-seconds
    }
}
