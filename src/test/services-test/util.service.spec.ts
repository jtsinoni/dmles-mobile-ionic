import { UtilService } from '../../app/common/services/util.service';
import { Platform } from "ionic-angular";

let utilService: UtilService = null;

describe('UtilService', () => {

    beforeEach(() => {
        utilService = new UtilService((<any>new Platform()));
    });

    it('initialises', () => {
        expect(utilService).not.toBeNull();
    });

    it('returns a random number string for generateTemporaryKey', () => {
        let value: string = utilService.generateTemporaryKey();
        console.log(value);
        expect(value).toBeDefined();
    });

    it('returns a random number for generateUUID', () => {
        let value: string = utilService.generateUUID();
        console.log(value);
        expect(value).toBeDefined();
    });

    it('returns false for isMobility', () => {
        expect(utilService.isMobility()).toBe(false);
    });

    it('returns a camel-cased string for convertToCamelCase', () => {
        let value: string = utilService.convertTextToCamelCase('my dog has fleas');
        expect(value).toEqual('myDogHasFleas');
    });

    it('returns a lowercase string from camel-cased string for convertCamelCaseToText', () => {
        let value: string = utilService.convertCamelCaseToText('MyDogHasFleas');
        // todo the starting space shouldn't be there imo
        expect(value).toEqual(' My Dog Has Fleas')
    });

    it('returns a float from currency for convertCurrencyToFloat', () => {
        let value: number = utilService.convertCurrencyToFloat('$12.00');
        expect(value).toEqual(12.00)
    });




});
