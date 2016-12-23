import {Injectable} from "@angular/core";

@Injectable()
export class UtilService {
    constructor() {}

    public addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    public convertCamelCaseToText(camelCaseText) {
        var result = camelCaseText.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    public convertTextToCamelCase(text) {
        return text
            .replace(/\s(.)/g, ($1) => {
                return $1.toUpperCase();
            })
            .replace(/\s/g, '')
            .replace(/^(.)/, ($1) => {
                return $1.toLowerCase();
            });
    }

    public convertCurrencyToFloat(currency) {
        if (!currency) {
            currency = "$0.00";
        }
        return Number(currency.replace(/[^0-9\.]+/g, ""));
    }

    public esBuildSearchStatsStr(numResults:string, time:string){
        var searchStatsStr:string = numResults + " items found ( " + time + " milliseconds )";
        return searchStatsStr;
    }

    /**
     * Escape special characters that might be embedded in the user-input search string(s)
     * not doing this causes issues for elasticsearch
     */
    public esEscapeSpecialChars(searchInput:string) {
        var escapedInput:string = searchInput.replace(/[!@#$%^&()+=\-[\]\\';,./{}|":<>?~_]/g, "\\$&");
        return escapedInput;
    }

    public getDateInMillis() {
        var d = new Date();
        return d.getTime();
    }

    public getDate(d) {
        var yr = d.getFullYear();
        var mn = this.addZero(d.getMonth());
        var dy = this.addZero(d.getDay());
        return yr + "-" + mn + "-" + dy;
    }

    public getDateTime(dateVar) {
        var d = new Date();
        if (dateVar) {
            d = dateVar;
        }
        var nowDateStr = this.getDate(d);
        var nowTimeStr = this.getTime(d);
        var currFullStr = nowDateStr + " " + nowTimeStr;
        return currFullStr;
    }

    public getTime(d) {
        var h = this.addZero(d.getHours());
        var m = this.addZero(d.getMinutes());
        var s = this.addZero(d.getSeconds());
        var ms = d.getMilliseconds();
        return h + ":" + m + ":" + s + "." + ms;
    }

    public getYears(numOfYears) {
        var currDate = new Date();
        var years = [];
        for (var i = 0; i < numOfYears; i++) {
            years.push(currDate.getFullYear() + i);
        }
        return years;
    }

    public isStringFound(searchFor, searchWithin) {
        var isFound = false;
        if (searchWithin.indexOf(searchFor) > -1) {
            isFound = true;
        }
        return isFound;
    }

    public isObjectEmpty(obj:any){
        var isEmpty = false;
        if({} === obj || null == obj || "" == obj){
            isEmpty = true;
        }
        return isEmpty;
    }

    public isInt(value) {
        var x = parseFloat(value);
        return !isNaN(value) && (x | 0) === x;
    }

    public replaceDoubleQuotesWithSlash(stringVar) {
        return stringVar.toString().replace(/"/g, '\\"');
    }

    public sortByName(arrayOfObjects, nameToCompare) {
        if (arrayOfObjects && arrayOfObjects.length > 0 && nameToCompare) {
            return arrayOfObjects.sort((a, b) => {
                var lowerA = a[nameToCompare].toLocaleLowerCase();
                var lowerB = b[nameToCompare].toLocaleLowerCase();
                if (lowerA < lowerB)
                    return -1;
                else if (lowerA > lowerB)
                    return 1;
                else
                    return 0;
            });
        } else {
            return arrayOfObjects;
        }
    }


    public sortResults(jList, prop, isAsc) {
        var jListSorted = jList.sort((a, b) => {
            if (isAsc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        });
        return jListSorted;
    }

    public validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

}
