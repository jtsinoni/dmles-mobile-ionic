import { ServiceBase } from './service-base';
import { ProviderConstants } from './provider-constants';
import { Http } from '@angular/http';
import { DataItemModel } from '../../models/data-item.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs";

export abstract class ApiService<T extends DataItemModel<K>, K> extends ServiceBase {

    serviceUrl: string;
    constructor(public http: Http, public url: string) {
        super();
        this.serviceUrl = url;
    }

    getMany(): Promise<T[]> {
        return this.http.get(
            this.serviceUrl)
            .toPromise()
            .then(response => response.json().data as T[])
            .catch(this.handleError);
    }

    getOne(id: K): Promise<T> {
        // todo .. better to add the id to the url..?
        return this.getMany().then(items => items.find(item => item.id === id));
    }

    create(item: T): Promise<T> {
        // TODO check this url
        const url = `${this.serviceUrl}/${item.id}`;
        return this.http
            .post(url, JSON.stringify(item), { headers: ProviderConstants.JSON_HEADERS })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(item: T): Promise<T> {
        // TODO check this url
        const url = `${this.serviceUrl}/${item}`;
        return this.http
            .put(url, JSON.stringify(item), { headers: ProviderConstants.JSON_HEADERS })
            .toPromise()
            .then(() => item)
            .catch(this.handleError);
    }

    delete(id: K): Promise<void> {
        const url = `${this.serviceUrl}/${id}`;
        return this.http.delete(url, { headers: ProviderConstants.JSON_HEADERS })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

     get(id: K): Observable<any> {     
        const url = `${this.serviceUrl}/${id}`;
        return this.http.get(url);
    }

}
