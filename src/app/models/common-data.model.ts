export class CommonDataModel {
    topic: string;
    message: string;
    messages: string;
    client: any;
    host: string;
    port: number;
    reconnectAttempts: number;

    constructor() {
        this.topic = 'dmles-mobile-ionic';
        this.message = 'Hello DML-ES Mobile!';
        this.messages = '';
        this.host = 'localhost';
        this.port = 61616;
        this.reconnectAttempts = 10;
    }
}
