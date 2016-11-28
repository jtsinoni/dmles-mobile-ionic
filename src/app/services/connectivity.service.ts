import {Injectable}    from '@angular/core';
import {Network} from 'ionic-native';

@Injectable()
export class ConnectivityService {
    public isConnected: boolean = false;

    //public data: CommonDataModel;
    constructor() {
        // This is the initial state.  Network.onDisconnect() or Network.onConnect() does not get called
        // unless the connection was previously lost or gained.
        this.isConnected = this.checkConnection();

        Network.onDisconnect().subscribe(() => {
            console.log('network disconnected');
            this.isConnected = false;
        });

        Network.onConnect().subscribe(() => {
            console.log('network connected');
            this.isConnected = true;
        });
    }

    public checkConnection() {
        // let networkState = Network.connection;
        // let states = {};
        // states[Connection.UNKNOWN] = 'Unknown connection';
        // states[Connection.ETHERNET] = 'Ethernet connection';
        // states[Connection.WIFI] = 'WiFi connection';
        // states[Connection.CELL_2G] = 'Cell 2G connection';
        // states[Connection.CELL_3G] = 'Cell 3G connection';
        // states[Connection.CELL_4G] = 'Cell 4G connection';
        // states[Connection.NONE] = 'No network connection';
        //
        // console.log('Connection type: ' + states[networkState]);
        // if (states[Connection.NONE] == states[networkState]) {
        //     return false;
        // }
        return true;
    }
}
