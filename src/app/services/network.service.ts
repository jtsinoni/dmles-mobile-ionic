import {Injectable}    from '@angular/core';
import {Network} from 'ionic-native';
import {LoggerService} from "./logger/logger-service";

declare var Connection: any;

@Injectable()
export class NetworkService {
    public isConnected: boolean = false;
    private serviceName = "NetworkService";

    constructor(private log: LoggerService) {
        this.init();
    }

    private init(): void {
        this.log.debug(`${this.serviceName} - Start`);

        // This is the initial state.  Network.onDisconnect() or Network.onConnect() does not get called
        // unless the connection was previously lost or gained.
        // this.isConnected = this.checkConnection();
        //
        Network.onDisconnect().subscribe(() => {
            this.log.debug('network disconnected');
            this.isConnected = false;
        });

        Network.onConnect().subscribe(() => {
            this.log.debug('network connected');
            this.isConnected = true;
        });

        this.isConnected = this.checkConnection();
    }

    public checkConnection(): boolean {
        let networkState = Network.connection;
        let states = {};
        let connected: boolean = false;

        // Connection object only exists on device, or if using ionics browser platform
        if(typeof Connection !== "undefined") {
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.NONE] = 'No network connection';

            this.log.debug('Connection type: ' + states[networkState]);
            if (states[Connection.NONE] == states[networkState]) {
                connected = false;
            } else {
                connected = true;
            }
        // This only occurs if running in browser i.e. ionic serve, assuming always connected
        } else {
            connected = true;
        }

        return connected;
    }
}
