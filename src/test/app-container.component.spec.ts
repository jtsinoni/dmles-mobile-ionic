import { AppContainerComponent } from '../app/app-container.component';
import { AlertControllerMock, NavMock } from './mocks';

let instance: AppContainerComponent = null;

describe('dmles-mobile-ionic-app-container', () => {

  beforeEach(() => {
    instance = new AppContainerComponent((<any> new NavMock), (<any> new AlertControllerMock));
    instance['nav'] = (<any>new NavMock());
  });

  it('initialises with four possible areas', () => {
    expect(instance['areas'].length).toEqual(5);
  });

//   it('initialises with a root page', () => {
//     expect(instance['rootPage']).not.toBe(null);
//   });

//   it('initialises with an app', () => {
//     expect(instance['app']).not.toBe(null);
//   });

  // it('opens a page', () => {
  //   spyOn(instance['menu'], 'close');
  //   spyOn(instance['nav'], 'setRoot');
  //   instance.openPage(instance['pages'][1]);
  //   expect(instance['menu']['close']).toHaveBeenCalled();
    //expect(instance['nav'].setRoot).toHaveBeenCalledWith(Page2);
  //});
});
