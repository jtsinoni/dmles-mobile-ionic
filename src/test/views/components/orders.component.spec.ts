import { NavMock, AlertControllerMock, PlatformMock, NavParamMock } from '../../mocks';

import { OrdersComponent } from '../../../app/views/supply/orders/orders.component';

let instance: OrdersComponent = null;

describe('OrdersComponent', () => {

    beforeEach(() => {
        instance= new OrdersComponent((<any> new NavMock), (<any> new NavParamMock), null, null, null,(<any> new PlatformMock));                
    });

    it('initialises', () => {
        expect(instance).not.toBeNull();
    });   
    
    
});