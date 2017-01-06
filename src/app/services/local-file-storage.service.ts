import {Logger} from "angular2-logger/core";
import {Injectable} from "@angular/core";
import {File} from 'ionic-native';

declare var cordova: any;

@Injectable()
export class LocalFileStorageService {
    private serviceName = "LocalFileStorageService";

    constructor(private log: Logger) {
        this.log.debug(`${this.serviceName} - Start`);
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

    public readFile() {
        File.readAsText(cordova.file.dataDirectory, "client.log")
            .then((fileContents) => {
                console.debug(`readFile() => ${fileContents}`);
            })
            .catch((error) => {
                console.error(error.message);
            });
    }

    public deleteFile() {
        File.removeFile(cordova.file.dataDirectory, "client.log")
            .then((removeResult) => {
                console.debug(`File client.log removed succesfully => ${JSON.stringify(removeResult)}`);
            })
            .catch((error) => {
                console.error(error.message)

            });
    }
}
