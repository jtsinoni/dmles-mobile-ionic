import {Injectable} from "@angular/core";

@Injectable()
export class AppConfig {
    constructor() {
    }

    public apiHosts: any = {
        //"btBaseUrl"   : "http://jw8cui04:8080/"  // Test
        //"btBaseUrl"   : "http://140.139.224.44:8080/"  // Test

        //"btBaseUrl"   : "http://jw8dmles102:8080/"  // Dev Old
        //"btBaseUrl"   : "http://140.139.227.170:8080/"  // Dev Old

        //"btBaseUrl"   : "https:/140.139.35.29:8443/"  // Dev New
        "btBaseUrl": "http://localhost:8080/"
    };

    //TODO: get from UserForm, derived credentials, etc
    public OAuth: any = {
        userName:"user.admin.123",
        password:"password"
    }

    public indexedDatabase: any = {
        name: "dmles-mobile-dt"
    }

    public messagingServer: any = {
        host:"localhost",
        port:"61616",
        topic:"dmles-mobile",
        reconnectAttempts:10
    }
}
