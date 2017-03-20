
import { NavMock, NavParamMock, LoggerServiceMock} from '../../mocks';
import { NotificationsComponent } from '../../../app/views/supply/notifications/notifications.component';

let instance: NotificationsComponent = null;

describe('NotificationsComponent', () => {

    beforeEach(() => {
        instance= new NotificationsComponent((<any> new NavMock), (<any> new NavParamMock), (<any> new LoggerServiceMock));
    });

    it('initialises', () => {
        expect(instance).not.toBeNull();
    });     

    
});
    
    