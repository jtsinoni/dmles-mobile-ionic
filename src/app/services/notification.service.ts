import {Injectable} from "@angular/core";
import {LocalNotifications} from '@ionic-native/local-notifications';
import {UtilService} from "../common/services/util.service";
import {LoggerService} from "./logger/logger-service";
import {AppConfigConstants} from "../constants/app-config.constants";

@Injectable()
export class NotificationService {
    private serviceName = "Notification Service";

    constructor(private log: LoggerService,
                private localNotifications: LocalNotifications,
                private UtilService: UtilService) {
        this.log.debug(`${this.serviceName} - Start`);
    }

    public addNotification(notification: any) {
        if(AppConfigConstants.notifications.enabled) {
            notification.id = this.UtilService.generateRandomNumberID();
            this.log.debug(`Notification ID => ${notification.id}`);
            this.log.debug(`Notification Message => ${JSON.stringify(notification)}`);

            this.localNotifications.schedule(notification);
        } else {
            this.log.debug(`Local notifications are not enabled.`);
        }
    }
}
