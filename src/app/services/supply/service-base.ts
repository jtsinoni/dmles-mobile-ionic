'use strict'


export abstract class ServiceBase {

    protected handleError(error: any): Promise<any> {
        // TODO add logging here (api actions too)
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

}
