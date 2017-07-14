import {Input, Component, NgZone} from '@angular/core';
import {LoggerService} from "../../../services/logger/logger-service";
import {ViewController} from "ionic-angular";
import {CACService} from "../../../services/cac.service";
import {AppInjector} from "../../../app.module";

@Component({
    selector: 'cac-setting',
    templateUrl: './cac-setting.component.html'
})
export class CacSettingComponent {
    public version: string = "PKard Vesion on device only";

    @Input()
    public readerAttached: boolean = false;

    @Input()
    public cacInserted: boolean = false;

    public fipsMode: boolean = true;
    private ngZone: NgZone;

    constructor(private log: LoggerService,
                private cacService: CACService,
                private viewController: ViewController) {

        this.init();
    }

    dismiss() {
        this.viewController.dismiss();
    }

    private init(): void {
        this.ngZone = AppInjector.get(NgZone);

        this.CACReaderVersion();
        this.isReaderAttached();
        this.isCardInserted();
    }

    private isCardInserted() {
        this.cacService.isCardInserted().subscribe((results) => {
            this.log.debug(`onCardInserted => ${results}`);

            this.ngZone.run(() => {
                this.cacInserted = results;
            });

        });
    }

    private CACReaderVersion() {
        this.cacService.CACReaderVersion()
            .then((results) => {
                this.version = results;
            })
            .catch((error) => {
                this.log.error(error);
            });
    }

    private isReaderAttached() {
        this.cacService.isReaderAttached().subscribe((results) => {
            this.log.debug(`isReaderAttached => ${results}`);

            this.ngZone.run(() => {
                this.readerAttached = results;
            });
        });
    }

    public setFipsMode() {
        this.cacService.setFipsMode(this.fipsMode)
            .then((results) => {
                this.log.debug(`FIPS Mode 140 set to => ${results}`);
            })
            .catch((error) => {
                this.log.error(error);
            });
    }

    public cacCheck() {
        this.cacService.cacCheck()
            .then((results) => {
                this.log.debug(`cacCheck => ${results}`);
            })
            .catch((error) => {
                this.log.error(error);
            });
    }
}
