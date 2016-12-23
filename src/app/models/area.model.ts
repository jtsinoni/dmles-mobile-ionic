export class AreaModel {
    color: string;
    title:string;
    iconName: string;
    component: any;

    constructor(name: string, icon: string, comp: any, color?: string) {
        this.title = name;
        this.iconName = icon;
        this.component = comp;
        if (color) {
            this.color = color;
        }
    }
}