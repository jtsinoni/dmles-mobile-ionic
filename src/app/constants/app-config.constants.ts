import {UtilService} from "../common/services/util.service";
export class AppConfigConstants {
    constructor() {
    }

    private static host: string = UtilService.getHost();

    public static clientLogFileName: string = "client.log";

    public static apiHosts: any = {
        //"btBaseUrl"   : "http://jw8cui04:8080/"  // OLD Test

        // From command prompt:
        //   > set HOST_MB=dmedpx3005      // Dev - NEW
        //   > set HOST_MB=dmetpx4007      // Test - NEW

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
        host:"johns-macbook-pro.local",
        port:"9001",
        default:{topic:"dmles-mobile"},
        im:{topic:"dmles-mobile-im"},
        eq:{topic:"dmles-mobile-eq"},
        abi:{topic:"dmles-mobile-abi"},
        protocol:"ws",
        reconnectAttempts:3,
        reconnectPeriod:2000,
        connect:true,
        clean:true,
        connectionTimeout:3000,
        qos:0,
        showStats: true
    }

    public static topicComponent: any = {
        page:"store"
    }

    public static printer: any = {
        bluetoothBarcodeKey: "BluetoothBarcodePrinter",
        defaultPaperKey: "DefaultPaperPrinter"
    }
}
