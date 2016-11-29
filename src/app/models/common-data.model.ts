export class CommonDataModel {
    topic: string;
    message: string;
    messages: string;
    client: any;
    host: string;
    port: number;
    badgeCount: number;
    pushedChanges: any[];

    constructor() {
        this.topic = 'dmles-mobile-ionic';
        this.message = 'Hello DML-ES Mobile!';
        this.messages = '';
        this.host = 'localhost';
        this.port = 61616;
        this.badgeCount = 0;
        this.pushedChanges = [];
    }
}
