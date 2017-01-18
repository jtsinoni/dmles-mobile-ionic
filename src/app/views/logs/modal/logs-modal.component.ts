import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";

import {LocalFileStorageService} from "../../../services/local-file-storage.service";
import {Input} from "@angular/core/src/metadata/directives";

@Component({
    templateUrl: './logs-modal.component.html',
    selector: 'logs-modal-view'
})
export class LogsModalComponent {
    @Input()
    public logData: string;

    constructor(private viewController: ViewController,
                private localFileStorageService: LocalFileStorageService) {
    }

    ngOnInit(): void {
        this.readFile();
    }

    public dismiss() {
        this.viewController.dismiss();
    }

    public clear() {
        this.localFileStorageService.deleteFile();
        this.logData = "";
    }

    private readFile() {
        this.localFileStorageService.readFile(this);
    }
}


