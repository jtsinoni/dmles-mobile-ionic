import {Injectable} from "@angular/core";
import {File, RemoveResult, FileEntry} from 'ionic-native';

declare var cordova: any;
const FILE_NAME = "client.log"

@Injectable()
export class LocalFileStorageService {
    private serviceName = "LocalFileStorageService";

    constructor() {
        console.debug(`${this.serviceName} - Start`);
    }

    public writeToFile(data: string) {
        Promise.resolve()
            .then(this.checkFile)
            .then((found) => {
                if(found) {
                    this.writeFile(data);
                } else {
                    this.createFile()
                        .then(() => {
                            this.writeFile(data);
                        });
                }
            })
            .catch((error) => {
                console.error(`writeToFile() => ${error}`);
            })
    }

    public readFile(component?: any) {
        File.readAsText(cordova.file.dataDirectory, FILE_NAME)
            .then((fileContents) => {
                if(component) {
                    component.logData = fileContents;
                }
                console.debug(`readFile() => ${fileContents}`);
            })
            .catch((error) => {
                if(error.code == 1) {
                    console.warn(`Unable to read file, file ${FILE_NAME} not found.`);
                    component.logData = "No Log Data";
                } else {
                    console.error(`readFile() => ${error.message}`);
                }
            });
    }

    public deleteFile() {
        File.removeFile(cordova.file.dataDirectory, FILE_NAME)
            .then((removeResult: RemoveResult) => {
                console.debug(`File ${removeResult.fileRemoved.name} removed => ${removeResult.success}`);
            })
            .catch((error) => {
                console.error(`deleteFile() => ${error.message}`);
            });
    }

    private writeFile(data: string): Promise<any> {
        return File.writeFile(cordova.file.dataDirectory, FILE_NAME, data, {replace: false, create: true, append: true})
            .then((results) => {
                console.debug(`writeFile(): Data written to client.log => ${data}`);
            })
            .catch((error) => {
                console.error(`writeFile(): ${error.message}`)
            })

    }

    public createFile(): Promise<any> {
        return File.createFile(cordova.file.dataDirectory, FILE_NAME, false)
            .then((fileEntry: FileEntry) => {
                console.debug(`Successfully created => ${fileEntry.name}`);

                return fileEntry;
            })
            .catch((error) => {
                if(error.code == 12) {  //PATH_EXISTS_ERR
                    console.warn(`${FILE_NAME} already exists`);

                    return false;
                } else {
                    console.error(`createFile(): ${error.message}`)
                }
            });

    }

    private checkFile(): Promise<any> {
        return File.checkFile(cordova.file.dataDirectory, FILE_NAME)
            .then((results) => {
                console.debug(`Successfully found file => ${FILE_NAME}`);
                return results;
            })
            .catch((error) => {
                if(error.code == 1) { //NOT_FOUND_ERR
                    console.debug(`Did not find file => ${FILE_NAME}`);

                    return false;
                }
                console.error(`checkFile(): ${error.message}`)
            });

    }
}
