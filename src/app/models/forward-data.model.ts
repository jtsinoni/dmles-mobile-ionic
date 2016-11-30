/**
 * Created by johntsinonis on 11/29/16.
 */
export class ForwardDataModel {
    pushedChanges: any[];

    constructor() {
        this.pushedChanges = [];
    }

    public getBadgeCount(): number {
        return this.pushedChanges.length;
    }
}

