import { browser, element, by, ElementFinder } from 'protractor';

// let findButton: ElementFinder = element(by.id('findSomethingButton'));
// let alertInputField: ElementFinder = element(by.css('.alert-input'));
// let alertButton: ElementFinder = element.all(by.css('.alert-button')).first();
let loginButton: ElementFinder = element(by.id('loginButton'));
let inputField: ElementFinder = element(by.id('loginInputField'));

describe('LoginComponent', () => {

    beforeEach(() => {
        browser.get('');
        
    });

    it('should have a main title', () => {
        expect(browser.getTitle()).toEqual('DML-ES Mobile');
    });

    it('should have app title \'DML-ES Mobile\'', () => {
        expect(element(by.css('ion-title')).getText()).toContain('DML-ES Mobile');
    });
    it('has a Log In Button', () => {
        expect(element(by.id('loginButton')).isPresent()).toEqual(true);
    }, 2000);

    it('should log in with default user dn', () => {
        browser.driver.sleep(2000);
        browser.actions().mouseDown(inputField).click().sendKeys('user.admin.123').perform();   
        browser.driver.sleep(2000);      
        loginButton.click();
        browser.driver.sleep(2000);      
    });


    // it('has a Search Button', () => {
    //     expect(element(by.id('findSomethingButton')).isPresent()).toEqual(true);
    // }, 2000);

    // it('should show find something dialog', () => {
    //     findButton.click();
    //    'looking for something'.split('').forEach((c => alertInputField.sendKeys(c)));       
    //     browser.driver.sleep(1000);
    //     expect(element(by.id('alert-msg-0')).getText()).toEqual('Find something')
    //     alertButton.click();
    // });



});