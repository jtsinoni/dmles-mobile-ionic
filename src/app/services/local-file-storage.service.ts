import {Injectable} from "@angular/core";
import {File, RemoveResult, FileEntry} from '@ionic-native/file';
import {AppConfigConstants} from "../constants/app-config.constants";
import {Platform} from "ionic-angular";

declare var cordova: any;
const FILE_NAME = AppConfigConstants.clientLogFileName;

@Injectable()
export class LocalFileStorageService {
    private serviceName = "LocalFileStorageService";

    constructor(private platform: Platform,
                private file: File) {
        this.init();
    }

    private init() {
        this.platform.ready()
            .then(() => {
                console.debug(`Debug: ${this.serviceName} - Start`);
            })
            .catch((error) => {
                console.error(`${error}`);
            });
    }

    public writeToFile(data: string) {
        Promise.resolve(this.checkFile())
            .then((found) => {
                if(found) {
                    this.writeFile(data);
                } else {
                    this.createFile()
                        .then(() => {
                            this.writeFile(data);
                        })
                }
            })
            .catch((error) => {
                console.error(`writeToFile() => ${error}`);
            })
    }

    public readFile(component?: any) {
        this.file.readAsText(cordova.file.dataDirectory, FILE_NAME)
            .then((fileContents) => {
                if(component) {
                    component.logData = fileContents;
                }
                //console.debug(`readFile() => ${fileContents}`);
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
        this.file.removeFile(cordova.file.dataDirectory, FILE_NAME)
            .then((removeResult: RemoveResult) => {
                console.debug(`File ${removeResult.fileRemoved.name} removed => ${removeResult.success}`);
            })
            .catch((error) => {
                console.error(`deleteFile() => ${error.message}`);
            });
    }

    private writeFile(data: string): Promise<any> {
        return this.file.writeFile(cordova.file.dataDirectory, FILE_NAME, data, {replace: false, append: true})
            .then((results) => {
                //console.debug(`writeFile(): Data written to client.log => ${data}`);
            })
            .catch((error) => {
                console.error(`writeFile(): ${error.message}`)
            })

    }

    public createFile(): Promise<any> {
        return this.file.createFile(cordova.file.dataDirectory, FILE_NAME, true)
            .then((fileEntry: FileEntry) => {
                console.debug(`Successfully created => ${fileEntry.name}`);

                return fileEntry;
            })
            .catch((error) => {
                if(error.code == 12) {  //PATH_EXISTS_ERR
                    //console.warn(`${FILE_NAME} already exists`);

                    return false;
                } else {
                    console.error(`createFile(): ${error.message}`)
                }
            });

    }

    public readDataFile(filename: string): any {
        let data: any;
        this.file.readAsText(cordova.file.dataDirectory, filename)
            .then((fileContents) => {
                data = fileContents;
            })
            .catch((error) => {
                if (error.code == 1) {
                    console.warn(`Unable to read file, file ${filename} not found.`);
                } else {
                    console.error(`readFile() => ${error.message}`);
                }
            });
        return data;
    }

    private checkFile(): Promise<any> {
        return this.file.checkFile(cordova.file.dataDirectory, FILE_NAME)
            .then((results) => {
                //console.debug(`Successfully found file => ${FILE_NAME}`);
                return results;
            })
            .catch((error) => {
                if(error.code == 1) { //NOT_FOUND_ERR
                    //console.debug(`Did not find file => ${FILE_NAME}`);

                    return false;
                }
                console.error(`checkFile(): ${error.message}`)
            });

    }
}
