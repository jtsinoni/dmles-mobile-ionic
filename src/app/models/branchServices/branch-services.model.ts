
import { BranchModel } from "./branch.model";
import { SiteModel } from "./site.model";

export class BranchServicesModel {

    branches: Array<BranchModel>;

    getSiteByDodaac(dodaac: string) : SiteModel {

        let site: SiteModel = null;
        for (let branch of this.branches) {
           site = branch.getSiteByDodaac(dodaac);
           if (site) {
               break;
           }
        }
        return site;
    }
}