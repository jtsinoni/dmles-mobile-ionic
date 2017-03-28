import {UtilService} from "../common/services/util.service";
export class AppConfigConstants {
    constructor() {
    }

    private static host: string = UtilService.getHost();

    public static clientLogFileName: string = "client.log";

    public static apiHosts: any = {
        //"btBaseUrl"   : "http://jw8cui04:8080/"  // OLD Test

        // From command prompt:
        //   > set HOST=dmedpx3005.jmlfdc.mil      // Dev - NEW
        //   > set HOST=dmetpx4007.jmlfdc.mil      // Test - NEW

        "btBaseUrl": (AppConfigConstants.host)?`${AppConfigConstants.host}`:`http://localhost:8080/`
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
        connect:false,
        showStats: false
    }

    public static topicComponent: any = {
        page:"store"
    }

    public static printer: any = {
        bluetoothBarcodeKey: "BluetoothBarcodePrinter",
        defaultPaperKey: "DefaultPaperPrinter"
    }
}
