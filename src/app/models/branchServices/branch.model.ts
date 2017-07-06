
import { RegionModel } from "./region.model";
import { SiteModel } from "./site.model";


export class BranchModel {
    code: string;
    name: string;
    regions: Array<RegionModel>;

    getSiteByDodaac(dodaac: string) : SiteModel {
        let site: SiteModel = null;
        for (let region of this.regions) {
           site = region.getSiteByDodaac(dodaac);
           if (site) {
               break;
           }
        }
        return site;
        
    }
}