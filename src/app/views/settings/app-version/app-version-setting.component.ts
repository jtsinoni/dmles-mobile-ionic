import {Component} from '@angular/core';
import {ViewController} from "ionic-angular";
import {AppVersionService} from "../../../services/app-version.service";

@Component({
    selector: 'app-version-setting',
    templateUrl: './app-version-setting.component.html'
})
export class AppVersionSettingComponent {
    constructor(private appVersionService: AppVersionService,
                private viewController: ViewController) {
    }

    dismiss() {
        this.viewController.dismiss();
    }

    public getAppName(): String {
        return this.appVersionService.getAppName();
    }

    public getPackageName(): String {
        return this.appVersionService.getPackageName();
    }

    public getVersionCode(): String {
        return this.appVersionService.getVersionCode();
    }

    public getVersionNumber(): String {
        return this.appVersionService.getVersionNumber();
    }
}
