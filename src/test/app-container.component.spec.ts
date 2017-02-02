import { AppContainerComponent } from '../app/app-container.component';
import {AlertControllerMock, NavMock, LoggerServiceMock, AppMock, MenuControllerMock} from './mocks';

let instance: AppContainerComponent = null;

describe('dmles-mobile-ionic-app-container', () => {

  beforeEach(() => {
    instance = new AppContainerComponent((<any> new NavMock), 
    (<any> new AlertControllerMock), 
    (<any> new LoggerServiceMock), 
    //(<any> new UpstreamServiceMock),
     (<any> new AppMock), (<any> new MenuControllerMock));
    instance['nav'] = (<any>new NavMock());
  });

  // it('initialises with six possible areas', () => {
  //   expect(instance['areas'].length).toEqual(6);
  // });
  

});
