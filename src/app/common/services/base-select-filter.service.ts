import {Injectable} from "@angular/core";

@Injectable()
export class BaseSelectFilterService {
    public value:string[] = [];
    public options:Array<any> = [];
    public optionsSelected:Array<any> = [];

    constructor() {
    }

    public buildSearchClause(dbFieldName: string): string {
        var returnValue: string = "";
        var i: number = 0;
        for (i = 0; i < this.optionsSelected.length; i++) {
            if (i > 0) {
                returnValue = returnValue + " OR ";
            }
            if (this.optionsSelected[i] !== "") {
                // escape special characters that might be embedded in DMLSS/DML-ES data
                // not doing this causes issues for elasticsearch
                returnValue = returnValue + "(" + dbFieldName + ':"'
                    + this.optionsSelected[i].selValue.replace(/[!@#$%^&()+=\-[\]\\';,./{}|":<>?~_]/g, "\\$&")
                    + '")';
            }

        }
        if (this.optionsSelected.length > 1) {
            returnValue = "(" + returnValue + ")";
        }
        // console.log("returnValue: %s", JSON.stringify(returnValue));
        return returnValue;
    }

    public initialize() {
        this.value = [];
        this.options = [];
        this.optionsSelected = [];
    }

    public process() {
        this.value = [];
        var n:string;
        for (n in this.optionsSelected) {
            var selection = this.optionsSelected[n];
            this.value.push(selection.selValue);
        }
    }

    public processOptionsSelected() {
        this.optionsSelected = [];
        var n:string;
        for (n in this.options) {
            if (this.options[n].selected) {
                var selection = this.options[n];
                this.optionsSelected.push(selection);
            }
        }
    }

    public removeDuplicates(inputArray) {
        var seen = {};
        var out = [];
        var len = inputArray.length;
        var j = 0;
        for (var i = 0; i < len; i++) {
            var item = inputArray[i];
            if (seen[item] !== 1) {
                seen[item] = 1;
                out[j++] = item;
            }
        }
        return out;
    }
}
