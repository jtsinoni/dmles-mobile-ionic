import {Input, Component} from '@angular/core';
import {LoggerService} from "../../../services/logger/logger-service";
import {ViewController} from "ionic-angular";
import {CACService} from "../../../services/cac.service";


@Component({
    selector: 'cac-setting',
    templateUrl: './cac-setting.component.html'
})
export class CacSettingComponent {
    public version: string;

    @Input()
    public readerAttached: boolean = false;

    @Input()
    public cacInserted: boolean = false;

    public fipsMode: boolean = true;

    constructor(private log: LoggerService,
                private cacService: CACService,
                private viewController: ViewController) {

        this.init();
    }


    private init(): void {
        this.CACReaderVersion();
        //this.isCardInserted();
        this.isReaderAttached();

        // this.cacService.isCardInserted2().subscribe((results) => {
        //     this.log.debug(`onCardInserted => ${results}`);
        //
        //     this.cacInserted = results;
        // });
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
        // this.cacService.isCardInserted()
        //     .then((results) => {
        //         this.cacInserted = results;
        //
        //         this.log.debug(`cacInserted => ${results}`);
        //     })
        //     .catch((error) => {
        //         this.log.error(error);
        //     });

        // this.cacService.onDisconnect().subscribe(() => {
        //     this.log.debug(`network disconnected`);
        //     this.isConnected = false;
        //     this.onNetworkConnectedSubject.next(this.isConnected);
        // });

        // this.cacService.isCardInserted2().subscribe((results) => {
        //     this.log.debug(`onCardInserted => ${results}`);
        //
        //     this.cacInserted = results;
        // });
        return false;
    }

    public isReaderAttached() {
        this.cacService.isReaderAttached()
            .then((results) => {
                this.readerAttached = results;

                this.log.debug(`readerAttached => ${results}`);
            })
            .catch((error) => {
                this.log.error(error);
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
}
