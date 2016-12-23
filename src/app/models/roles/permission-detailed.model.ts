import {PermElement} from "./perm-element.model";
import {PermState} from "./perm-state.model";
import {PermEndpoint} from "./perm-endpoint.model";

export class PermissionDetailed {
    public id: any = "";
    public name: string = "";
    public description: string = "";
    public functionalArea: string = "";
    public elements:Array<PermElement> = [];
    public states:Array<PermState> = [];
    public endpoints:Array<PermEndpoint> = [];

    constructor();
    constructor(obj: PermissionDetailed);
    constructor(obj?: any) {
        this.id = obj && obj.id || "";
        this.name = obj && obj.name || "";
        this.description = obj && obj.description || "";
        this.functionalArea = obj && obj.functionalArea || "";
        this.elements = obj && obj.elements || [];
        this.states = obj && obj.states || [];
        this.endpoints = obj && obj.endpoints || [];
    }
}
