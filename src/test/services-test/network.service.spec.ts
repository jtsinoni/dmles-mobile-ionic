import { NetworkService } from '../../app/services/network.service';


let networkService: NetworkService = null;

describe('NetworkService', () => {

    beforeEach(() => {
        networkService = new NetworkService();        
    });

    it('initialises', () => {
        expect(networkService).not.toBeNull();
    });

    it('returns false for checkConnection', () => {
        expect(networkService.checkConnection()).toEqual(false);
    });
});