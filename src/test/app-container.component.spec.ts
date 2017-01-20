import { AppContainerComponent } from '../app/app-container.component';
import {AlertControllerMock, NavMock, LoggerServiceMock, UpstreamServiceMock} from './mocks';

let instance: AppContainerComponent = null;

describe('dmles-mobile-ionic-app-container', () => {

  beforeEach(() => {
    instance = new AppContainerComponent((<any> new NavMock), (<any> new AlertControllerMock), (<any> new LoggerServiceMock), (<any> new UpstreamServiceMock));
    instance['nav'] = (<any>new NavMock());
  });

  it('initialises with five possible areas', () => {
    expect(instance['areas'].length).toEqual(5);
  });

});
