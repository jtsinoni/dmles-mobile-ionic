import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";

import {LocalFileStorageService} from "../../../services/local-file-storage.service";
import {LoggerService} from "../../../services/logger/logger-service";
import {Input} from "@angular/core/src/metadata/directives";

@Component({
    templateUrl: 'logs-modal.component.html',
    selector: 'logs-modal-view'
})
export class LogsModalComponent {
    @Input()
    public logData: string;

    constructor(private viewController: ViewController,
                private localFileStorageService: LocalFileStorageService,
                private log: LoggerService) {
    }

    ngOnInit(): void {
        this.readFile();
    }

    public dismiss() {
        this.viewController.dismiss();
    }

    public deleteFile() {
        this.localFileStorageService.deleteFile();
    }

    private readFile() {
        this.localFileStorageService.readFile(this);
    }
}


