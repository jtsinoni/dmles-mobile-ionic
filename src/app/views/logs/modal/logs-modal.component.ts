import {Component} from "@angular/core";
import {ModalController, ViewController} from 'ionic-angular';
import {File} from 'ionic-native';
import {Logger} from "angular2-logger/core";
import {LocalFileStorageService} from "../../../services/local-file-storage.service";

declare var cordova: any;


@Component({
    templateUrl: './logs-modal.component.html',
    selector: 'logs-modal-view'
})
export class LogsModalComponent {
    directory: string = cordova.file.dataDirectory;

    constructor(private ModalController: ModalController,
                private viewController: ViewController,
                private localFileStorageService: LocalFileStorageService,
                private log: Logger) {
    }

    public dismiss() {
        this.viewController.dismiss();
    }

    public writeFile() {
        this.localFileStorageService.writeFile("hello world");

    }

    public readFile() {
        this.localFileStorageService.readFile();
    }

    public deleteFile() {
        this.localFileStorageService.deleteFile();
    }

    // public checkDir() {
    //     File.checkDir(this.directory, 'mydir')
    //         .then((results) => {
    //             this.log.info(`Directory Exists => ${results}`);
    //         })
    //         .catch(error => {
    //             this.log.error(`Error: ${error}`);
    //         });
    // }
}


