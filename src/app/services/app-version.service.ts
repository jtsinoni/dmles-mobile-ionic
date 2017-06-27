import {Injectable} from "@angular/core";
import {Platform} from "ionic-angular";
import {AppVersion} from "@ionic-native/app-version";
import {LoggerService} from "./logger/logger-service";
import {UtilService} from "../common/services/util.service";

@Injectable()
export class AppVersionService {
    private serviceName = "AppVersion Service";

    // defaults:  just placeholders
    private appName: String = "App name on device only";
    private appPackageName: String = "Package name on device only";
    private appVersionCode: String = "Version code on device only";
    private appVersionNumber: String = "Version number on device only";

    constructor(private log: LoggerService,
                private appVersion: AppVersion,
                private platform: Platform,
                private utilService: UtilService) {
        this.init();
    }

    private init() {
        this.platform.ready()
            .then(() => {
                this.log.debug(`${this.serviceName} - Start`);

                if(this.utilService.isMobility()) {
                    this.appVersion.getAppName()
                        .then((name) => {
                            this.appName = name;
                            //this.log.debug(`App Name => ${name}`);
                        })

                    this.appVersion.getPackageName()
                        .then((packageName) => {
                            this.appPackageName = packageName;
                            //this.log.debug(`App Package Name => ${name}`);
                        })


                    this.appVersion.getVersionCode()
                        .then((versionCode) => {
                            this.appVersionCode = versionCode;
                            //this.log.debug(`App Version Code => ${name}`);
                        })


                    this.appVersion.getVersionNumber()
                        .then((versionNumber) => {
                            this.appVersionNumber = versionNumber;
                            this.log.debug(`App Version Number => ${name}`);
                        })
                }
            })
            .catch((error) => {
                this.log.error(`${error}`);
            });
    }

    public getAppName(): String {
        return this.appName;
    }

    public getPackageName(): String {
        return this.appPackageName;
    }

    public getVersionCode(): String {
        return this.appVersionCode;
    }

    public getVersionNumber(): String {
        return this.appVersionNumber;
    }
}