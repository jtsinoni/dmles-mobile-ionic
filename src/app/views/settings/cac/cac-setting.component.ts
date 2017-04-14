import {Component} from '@angular/core';
import {LoggerService} from "../../../services/logger/logger-service";
import {ViewController} from "ionic-angular";
import {CACService} from "../../../services/cac.service";


@Component({
    selector: 'cac-setting',
    templateUrl: './cac-setting.component.html'
})
export class CacSettingComponent {
    public version: string;
    public readerAttached: boolean = false;
    public cacInserted: boolean = false;
    public fipsMode: boolean = true;

    constructor(private log: LoggerService,
                private cacService: CACService,
                private viewController: ViewController) {
    }

    ngOnInit(): void {
        this.CACReaderVersion();
        this.isCardInserted();
        this.isReaderAttached()
    }

    dismiss() {
        this.viewController.dismiss();
    }

    public CACReaderVersion() {
        this.cacService.CACReaderVersion()
            .then((results) => {
                this.version = results;
            })
            .catch((error) => {
                this.log.error(error);
            });

    }

    public isCardInserted() {
        this.cacService.isCardInserted()
            .then((results) => {
                this.cacInserted = results;
            })
            .catch((error) => {
                this.log.error(error);
            });

    }

    public isReaderAttached() {
        this.cacService.isReaderAttached()
            .then((results) => {
                this.readerAttached = results;
            })
            .catch((error) => {
                this.log.error(error);
            });

    }
}
