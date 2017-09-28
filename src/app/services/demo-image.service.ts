import { Injectable } from "@angular/core";
import { LoggerService } from "./logger/logger-service";

// for demo images only remove for production
@Injectable()
export class DemoImageService {
    private serviceName = "Demo Image Service";
    private assetImageDirectory = "assets/images/"
    private imageExtension = ".png";

    constructor(private log: LoggerService) {
        this.log.debug(`${this.serviceName} - Start`);
    }


    public getAssetImageUrl(itemId: string) {
        let url = null;
        if (this.hasImageAsset(itemId)) {
           url =  this.assetImageDirectory + itemId + this.imageExtension;           
        } 
        return url;
    }

    private hasImageAsset(itemId: string): boolean {
        let imageList = [
            "00051846233",
            "00054327099",
            "00074433902",
            "00281020545",
            "00338100702",
            "00378563279",
            "00536097085",
            "00555902858",
            "00603459315",
            "00603576921",
            "00781140797",
            "16252060102",
            "41167431004",
            "43478024245",
            "52544025928",
            "63824005718",
            "00073852022391"
        ];

        return imageList.filter(i => i === itemId).length > 0;
    }




}
