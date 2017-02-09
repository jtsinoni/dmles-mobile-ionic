export class AppConfigConstants {
    constructor() {
    }

    public static clientLogFileName: string = "client.log";

    public static apiHosts: any = {
        //"btBaseUrl"   : "http://jw8cui04:8080/"  // Test
        //"btBaseUrl"   : "http://140.139.224.44:8080/"  // Test

        //"btBaseUrl"   : "http://jw8dmles102:8080/"  // Dev Old
        //"btBaseUrl"   : "http://140.139.227.170:8080/"  // Dev Old - jw8dmles103 (DON'T USE)
        //"btBaseUrl"   : "http://140.139.227.169:8080/"  // Dev Old - jw9dmles102 (USE)


        //"btBaseUrl"   : "https:/140.139.35.29:8443/"  // Dev New
        "btBaseUrl": "http://localhost:8080/"
    };

    //TODO: get from UserForm, derived credentials, etc
    public static OAuth: any = {
        userName:"user.admin.123",
        password:"password"
    }

    public static indexedDatabase: any = {
        name: "dmles-mobile-dt"
    }

    public static messagingServer: any = {
        host:"localhost",
        port:"61616",
        topic:"dmles-mobile",
        reconnectAttempts:10,
        connect:false
    }

    public static topicComponent: any = {
        page:"start"
    }
}
