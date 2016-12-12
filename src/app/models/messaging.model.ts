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
        this.topic = 'dmles-mobile-ionic';
        this.message = 'Hello DML-ES Mobile!';
        this.messages = '';
        this.host = 'localhost';
        this.port = 61616;
        this.reconnectAttempts = 10; // in seconds
        this.reconnectPeriod = 2000; // in milli-seconds
    }
}
