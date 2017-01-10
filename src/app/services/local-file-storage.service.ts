import {Injectable} from "@angular/core";
import {File, RemoveResult} from 'ionic-native';

declare var cordova: any;

@Injectable()
export class LocalFileStorageService {
    private serviceName = "LocalFileStorageService";

    constructor() {
        console.debug(`${this.serviceName} - Start`);
    }

    public writeFile(data: string) {
        File.writeFile(cordova.file.dataDirectory, "client.log", data, {append: true})
            .then((results) => {
                console.debug(`writeFile(): Data written to client.log => ${data}`);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    public readFile(component?: any) {
        File.readAsText(cordova.file.dataDirectory, "client.log")
            .then((fileContents) => {
                if(component) {
                    //component.logData = this.base64Service.b64DecodeUnicode(<string>fileContents);
                    component.logData = fileContents;
                }
                console.debug(`readFile() => ${fileContents}`);
            })
            .catch((error) => {
                console.error(error.message);
            });
    }

    public deleteFile() {
        File.removeFile(cordova.file.dataDirectory, "client.log")
            .then((removeResult: RemoveResult) => {
                console.debug(`File ${removeResult.fileRemoved.name} removed => ${removeResult.success}`);
            })
            .catch((error) => {
                console.error(error.message)
            });
    }
}
