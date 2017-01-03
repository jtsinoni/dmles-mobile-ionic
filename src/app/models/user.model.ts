export class User {

    public accessApprovedDate:Date = null;
    public createdDate:Date = null;
    public defaultDodaac:any = null;
    public dodaacs:Array<any> = [];
    public email:string = "";
    public id:any = "";
    public isActive:Boolean = true;
    public firstName:string = "";
    public lastName:string = "";
    public password:string = "";
    public phoneNumbers:Array<any> = [];
    public notesAccess:string = "";
    public notesAdmin:string = "";
    public organizations:Array<any> = [];
    public region:any = null;
    public roles:Array<any> = [];
    public service:any = null;
    public updatedDate:Date = null;
    public userType:string = "";

    constructor();
    constructor(obj:User);
    constructor(obj?:any) {
        this.accessApprovedDate = obj && obj.accessApprovedDate || null;
        this.createdDate = obj && obj.createdDate || null;
        this.defaultDodaac = obj && obj.defaultDodaac || null;
        this.dodaacs = obj && obj.dodaacs || [];
        this.email = obj && obj.email || "";
        this.id = obj && obj.id || "";
        this.isActive = obj && obj.isActive || true;
        this.firstName = obj && obj.firstName || "";
        this.lastName = obj && obj.lastName || "";
        this.organizations = obj && obj.organizations || [];
        this.password = obj && obj.password || "";
        this.phoneNumbers = obj && obj.phoneNumbers || [];
        this.notesAccess = obj && obj.notesAccess || "";
        this.notesAdmin = obj && obj.notesAdmin || "";
        this.region = obj && obj.region || null;
        this.roles = obj && obj.roles || [];
        this.service = obj && obj.service || null;
        this.updatedDate = obj && obj.updatedDate || null;
        this.userType = obj && obj.userType || "";
    };
}
