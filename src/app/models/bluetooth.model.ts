
export class BluetoothModel {
    class: string;
    id: string; // mac or UUID
    address: string;
    name: string; // common name

    // constructor () {
    // }

    constructor(cls?: string, id?: string, address?: string, name?: string) {
        if (cls) {
            this.class = cls;
        }
        if (id) {
            this.id = id;
        }
        if (address) {
            this.address = address;
        }
        if (name) {
            this.name = name;
        }
    }

}
