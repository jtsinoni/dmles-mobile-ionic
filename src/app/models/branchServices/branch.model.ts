
import { RegionModel } from "./region.model";

export class BranchModel {
    code: string;
    name: string;
    regions: Array<RegionModel>;
}