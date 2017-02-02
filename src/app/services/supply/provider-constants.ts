
import { Headers } from '@angular/http';

export class ProviderConstants {

    static SERVER_TOKEN: string = "server_token";
    static JSON_HEADERS: any = new Headers({ 'Content-Type': 'application/json' });
    
    static ITEM_REF: string = 'REF-';
  
}