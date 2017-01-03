import {Injectable} from "@angular/core";

@Injectable()
export class AppConfig {
  public apiHosts: any = {
    //"btBaseUrl"   : "http://jw8cui04:8080/"  // Test
    //"btBaseUrl"   : "http://jw8dmles102:8080/"  // Dev Old
    //"btBaseUrl"   : "https:/140.139.35.29:8443/"  // Dev New
    "btBaseUrl"   : "http://localhost:8080/"

  };

  constructor(){}
}
