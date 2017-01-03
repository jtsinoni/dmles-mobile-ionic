import {Http} from "@angular/http";
import {Logger} from "angular2-logger/core";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

import {ApiService} from "../../services/api.service";
import {Role} from "../../models/roles/role.model";
import {Permission} from "../../models/roles/permission.model";
import {PermissionDetailed} from "../../models/roles/permission-detailed.model";
import {PermElement} from "../../models/roles/perm-element.model";
import {PermState} from "../../models/roles/perm-state.model";
import {PermEndpoint} from "../../models/roles/perm-endpoint.model";
import {AuthenticationService} from "../../services/authentication.service";
import {AppService} from "../../services/app.service";

@Injectable()
export class RoleService extends ApiService {
    public serviceName: string = "Role Service";

    constructor(http: Http,
                public log: Logger,
                protected authenticationService: AuthenticationService,
                private app: AppService) {

        super(http, log, authenticationService, app, "Role");
        this.log.debug(`${this.serviceName} - Start`);
    }


    /************************************************
     //
     // Functions used for Role amd User Management
     //
     *************************************************/
    public createRole(role: Role): Observable<any> {
        return this.post("createRole", role);
    }

    public deleteRole(roleId: string): Observable<any> {
        return this.post("deleteRole", roleId);
    }

    // uses permission model - without elements, states and endpoints - used to build lists for
    // User and Role Management purposes
    public getAllPermissions(): Observable<Permission[]> {
        return this.get("getAllPermissions");
    }

    public getAllRoles(): Observable<any> {
        return this.get("getAllRoles");
    }

    public saveRoleData(role: Role): Observable<any> {
        return this.post("saveRoleData", role);
    }

    public saveRolePermissions(role: Role): Observable<any> {
        return this.post("saveRolePermissions", role);
    }

    /************************************************
     //
     // Functions used for Permission Management
     //
     *************************************************/
    public createPermissionDetailed(permission: PermissionDetailed): Observable<any> {
        return this.post("createPermissionDetailed", permission);
    }

    public deletePermissionDetailed(permission: PermissionDetailed): Observable<any> {
        return this.post("deletePermissionDetailed", permission);
    }

    public getAllElements(): Observable<PermElement[]> {
        return this.get("getAllElements");
    }

    public getAllEndpoints(): Observable<PermEndpoint[]> {
        return this.get("getAllEndpoints");
    }

    // uses permissionDetailed model - includes elements, states and endpoints - used to access
    // Permissions for CRUD by Permission Management
    public getAllPermissionsDetailed(): Observable<PermissionDetailed[]> {
        return this.get("getAllPermissionsDetailed");
    }

    public getAllStates(): Observable<PermState[]> {
        return this.get("getAllStates");
    }

    public savePermissionData(permission: PermissionDetailed): Observable<any> {
        return this.post("savePermissionDetailed", permission);
    }

    public savePermissionElements(permission: PermissionDetailed): Observable<any> {
        return this.post("savePermissionElements", permission);
    }

    public savePermissionEndpoints(permission: PermissionDetailed): Observable<any> {
        return this.post("savePermissionEndpoints", permission);
    }

    public savePermissionStates(permission: PermissionDetailed): Observable<any> {
        return this.post("savePermissionStates", permission);
    }
}
