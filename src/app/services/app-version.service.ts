import {Injectable} from "@angular/core";
import {Platform} from "ionic-angular";
import {AppVersion} from "@ionic-native/app-version";
import {LoggerService} from "./logger/logger-service";


@Injectable()
export class AppVersionService {
    private serviceName = "AppVersion Service";

    constructor(private log: LoggerService,
                private appVersion: AppVersion,
                private platform: Platform) {
        this.init();
    }

    private init() {
        this.platform.ready()
            .then(() => {
                this.log.debug(`${this.serviceName} - Start`);

                this.appVersion.getAppName()
                    .then((name) => {
                        this.log.debug(`App Name => ${name}`);
                    })

                this.appVersion.getPackageName()
                    .then((name) => {
                        this.log.debug(`App Package Name => ${name}`);
                    })


                this.appVersion.getVersionCode()
                    .then((name) => {
                        this.log.debug(`App Version Code => ${name}`);
                    })


                this.appVersion.getVersionNumber()
                    .then((name) => {
                        this.log.debug(`App Version Number => ${name}`);
                    })
            })
            .catch((error) => {
                this.log.error(`${error}`);
            });
    }
}
