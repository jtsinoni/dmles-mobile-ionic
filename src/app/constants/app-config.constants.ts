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
        //host:"johns-macbook-pro.local",
        host:"192.168.1.13",
        //host:"192.168.1.129",
        //host:"172.16.32.13",
        port:"9001",
        default:{topic:"logicole-mobile"},
        im:{topic:"logicole-mobile-im"},
        eq:{topic:"logicole-mobile-eq"},
        abi:{topic:"logicole-mobile-abi"},
        protocol:"ws",
        reconnectAttempts:3,
        reconnectPeriod:2000,
        connect:true,
        clean:true,
        connectionTimeout:3000,
        qos:0,
        showStats: true
    }

    public static notifications: any = {
        enabled: true
    }

    public static topicComponent: any = {
        page:"store"
    }

    public static printer: any = {
        bluetoothBarcodeKey: "BluetoothBarcodePrinter",
        defaultPaperKey: "DefaultPaperPrinter"
    }
}
