import { DMLESMobile }                      from '../app/app.component';
import { MenuMock, NavMock, PlatformMock } from './mocks';

let instance: DMLESMobile = null;

describe('dmles-mobile-ionic-app', () => {

  beforeEach(() => {
    instance = new DMLESMobile((<any> new PlatformMock), (<any> new MenuMock));
    instance['nav'] = (<any>new NavMock());
  });

  // it('initialises with two possible pages', () => {
  //   expect(instance['pages'].length).toEqual(2);
  // });

  it('initialises with a root page', () => {
    expect(instance['rootPage']).not.toBe(null);
  });

  it('initialises with an app', () => {
    expect(instance['app']).not.toBe(null);
  });

  // it('opens a page', () => {
  //   spyOn(instance['menu'], 'close');
  //   spyOn(instance['nav'], 'setRoot');
  //   instance.openPage(instance['pages'][1]);
  //   expect(instance['menu']['close']).toHaveBeenCalled();
    //expect(instance['nav'].setRoot).toHaveBeenCalledWith(Page2);
  //});
});