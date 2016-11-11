export class MQTTModel {
    topic: string;
    message: string;
    messages: string;
    client: any;
    host: string;
    port: string;

    constructor() {
        this.topic = 'dmles-mobile-ionic';
        this.message = 'Hello DML-ES Mobile!';
        this.messages = '';
        this.host = 'localhost';
        this.port = '61616';
    }
}
