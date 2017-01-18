import { Injectable } from "@angular/core";
import { File, RemoveResult } from 'ionic-native';
import { UtilService } from "../common/services/util.service";

declare var cordova: any;

@Injectable()
export class LocalFileStorageService {
    private serviceName = "LocalFileStorageService";
    private isMobility: boolean;
    constructor(public util: UtilService) {
        this.isMobility = this.util.isMobility();
        console.debug(`${this.serviceName} - Start`);

    }

    public writeFile(data: string) {

        if (this.isMobility) {
            File.writeFile(cordova.file.dataDirectory, "client.log", data, { append: true })
                .then((results) => {
                    console.debug(`writeFile(): Data written to client.log => ${data}`);
                })
                .catch((error) => {
                    console.error(error);
                });
        } 

    }

    public readFile(component?: any) {
        if (this.isMobility) {
            File.readAsText(cordova.file.dataDirectory, "client.log")
                .then((fileContents) => {
                    if (component) {
                        component.logData = fileContents;
                    }
                    console.debug(`readFile() => ${fileContents}`);
                })
                .catch((error) => {
                    console.error(error.message);
                });
        } 
    }

    public deleteFile() {
        if (this.isMobility) {
            File.removeFile(cordova.file.dataDirectory, "client.log")
                .then((removeResult: RemoveResult) => {
                    console.debug(`File ${removeResult.fileRemoved.name} removed => ${removeResult.success}`);
                })
                .catch((error) => {
                    console.error(error.message)
                });
        }
    }  
}
