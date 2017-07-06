
import { SiteModel } from './site.model';

export class RegionModel {
    code: string;
    name: string;
    sites:Array<SiteModel>;

    getSiteByDodaac(dodaac: string) : SiteModel {
        return this.sites.find(t => t.dodaac == dodaac);
    }

}