import { browser, element, by, ElementFinder } from 'protractor';

let findButton: ElementFinder = element(by.id('findSomethingButton'));
let alertInputField: ElementFinder = element(by.css('.alert-input'));
let alertButton: ElementFinder = element.all(by.css('.alert-button')).first();

describe('AppContainerComponent', () => {

    beforeEach(() => {
        browser.waitForAngular();
    });

    it('should have a main title', () => {
        expect(browser.getTitle()).toEqual('DML-ES Mobile');
    });

    it('should have app title \'DML-ES Mobile\'', () => {
        expect(element(by.css('ion-title')).getText()).toContain('DML-ES Mobile');
    });

    it('has a Search Button', () => {
        expect(element(by.id('findSomethingButton')).isPresent()).toEqual(true);
    }, 2000);

    it('should show find something dialog', () => {
        findButton.click();
       'looking for something'.split('').forEach((c => alertInputField.sendKeys(c)));       
        browser.driver.sleep(1000);
        expect(element(by.id('alert-msg-0')).getText()).toEqual('Find something')
        alertButton.click();
    });



});
