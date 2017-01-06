import {Injectable} from "@angular/core";
import {LocalNotifications} from 'ionic-native';
import {Logger} from "angular2-logger/core";
import {UtilService} from "../common/services/util.service";


@Injectable()
export class NotificationService {
    private serviceName = "Notification Service";

    constructor(private log: Logger,
                private UtilService: UtilService) {
        this.log.debug(`${this.serviceName} - Start`);
    }

    public addNotification(notification: any) {
        notification.id = this.UtilService.generateUUID();
        this.log.debug(`UUID => ${notification.id}`);
        this.log.debug(`Notification => ${JSON.stringify(notification)}`);

        LocalNotifications.schedule(notification);
    }
}
