import { NavMock } from '../../mocks';
import { SupplyComponent } from '../../../app/views/supply/supply.component';

let instance: SupplyComponent = null;

describe('SupplyComponent', () => {

    beforeEach(() => {
        instance= new SupplyComponent((<any> new NavMock));        
    });

    it('initialises', () => {
        expect(instance).not.toBeNull();
    });
    
    it('initializes with 4 areas', () => {
        expect(instance['areas'].length).toEqual(4);
    });   
});