import { NavMock, PlatformMock, NavParamMock, ModalControllerMock, ActionSheetControllerMock } from '../../mocks';
import { OrderServiceMock } from '../../services-test/services-mocks/order-service-mock';
import { OrdersComponent } from '../../../app/views/supply/orders/orders.component';


let instance: OrdersComponent = null;

describe('OrdersComponent', () => {

    beforeEach(() => {
        instance= new OrdersComponent((<any> new NavMock), (<any> new NavParamMock), 
        (<any>new OrderServiceMock), (<any> new ModalControllerMock), (<any> new ActionSheetControllerMock), (<any> new PlatformMock));                
    });

    it('initialises', () => {
        expect(instance).not.toBeNull();
    });   

    it('has undefined ordersList', () => {
        expect(instance.ordersList).toBeUndefined();
    });

    // it('gets Mock Order Data', (done: Function) => {
    //     instance['getOrders'].then((resolvedModels: Array<{}>) => {

    //     })
    // })

    
});
    
    