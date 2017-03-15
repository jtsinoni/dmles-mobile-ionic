import { DMLESMobile } from '../app/app.component';
import {
    NavMock, PlatformMock, UtilServiceMock,
    AppMock, AuthServiceMock, LoginModalServiceMock,
    UpstreamServiceMock, LoggerServiceMock, CACServiceMock,
    SettingsServiceMock
} from './mocks';


let instance: DMLESMobile = null;
describe('dmles-mobile-ionic-app', () => {

  beforeEach(() => {
    instance = new DMLESMobile(
      (<any>new PlatformMock),
      (<any>new UtilServiceMock),
      (<any>new AppMock),
      (<any>new AuthServiceMock),
      (<any>new LoginModalServiceMock),
      (<any>new UpstreamServiceMock),
      (<any>new LoggerServiceMock),
      (<any>new CACServiceMock), 
      (<any>new SettingsServiceMock));

    instance['nav'] = (<any>new NavMock());
  });

  it('initialises with a root page', () => {
    expect(instance['rootPage']).not.toBe(null);
  });

  it('initialises with an app', () => {
    expect(instance['app']).not.toBe(null);
  });

  it('initialises with six possible areas', () => {
    expect(instance['areas'].length).toEqual(6);
  });

  // it('opens a page', () => {
  //   spyOn(instance['menu'], 'close');
  //   spyOn(instance['nav'], 'setRoot');
  //   instance.openPage(instance['pages'][1]);
  //   expect(instance['menu']['close']).toHaveBeenCalled();
  //expect(instance['nav'].setRoot).toHaveBeenCalledWith(Page2);
  //});
});
