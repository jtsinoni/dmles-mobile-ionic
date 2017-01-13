import { NetworkService } from '../../app/services/network.service';
import {LoggerServiceMock} from "../mocks";


let networkService: NetworkService = null;

describe('NetworkService', () => {

    beforeEach(() => {
        networkService = new NetworkService((<any> new LoggerServiceMock));
    });

    it('initialises', () => {
        expect(networkService).not.toBeNull();
    });

    it('returns true for checkConnection', () => {
        expect(networkService.checkConnection()).toEqual(true);
    });
});
