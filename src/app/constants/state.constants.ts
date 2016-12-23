export class StateConstants {
    static SECURITY:string = 'dmles.security';

    static LOGIN_SHELL:string = 'dmles.login';
    static LOGIN:string = 'dmles.login.form';
    static REGISTER:string = 'dmles.login.form.register';
    static REGISTER_CONFIRM:string = 'dmles.login.form.register.confirmation';

    static HOME_ROOT:string = 'dmles.home';
    static ABOUT:string = 'dmles.home.about';
    static HELP:string = 'dmles.home.help';
    static MY_DASHBOARD:string = 'dmles.home.dashboard';
    static USER_PROFILE:string = 'dmles.home.userProfile';
    static USER_PROFILE_EDIT_GEN_INFO:string = 'dmles.home.userProfile.editGenInfoUserProfile';

    static ADMIN_SHELL:string = 'dmles.home.admin';
    static ADMIN_PERMISSION_MNG:string = 'dmles.home.admin.permissionMng';
    static ADMIN_PERMISSION_CREATE:string = 'dmles.home.admin.permissionMng.createPermission';
    static ADMIN_PERMISSION_EDIT_ELEMENTS:string = 'dmles.home.admin.permissionMng.editElementsPermission';
    static ADMIN_PERMISSION_EDIT_ENDPOINTS:string = 'dmles.home.admin.permissionMng.editEndpointsPermission';
    static ADMIN_PERMISSION_EDIT_GEN_INFO:string = 'dmles.home.admin.permissionMng.editGenInfoPermission';
    static ADMIN_PERMISSION_EDIT_STATES:string = 'dmles.home.admin.permissionMng.editStatesPermission';
    static ADMIN_PERMISSION_VIEW:string = 'dmles.home.admin.permissionMng.viewPermission';

    static ADMIN_ROLE_MNG:string = 'dmles.home.admin.roleMng';
    static ADMIN_ROLE_CREATE:string = 'dmles.home.admin.roleMng.createRole';
    static ADMIN_ROLE_EDIT_GEN_INFO:string = 'dmles.home.admin.roleMng.editGenInfoRole';
    static ADMIN_ROLE_EDIT_PERMS:string = 'dmles.home.admin.roleMng.editPermsRole';
    static ADMIN_ROLE_VIEW:string = 'dmles.home.admin.roleMng.viewRole';

    static ADMIN_USER_PROFILE_MNG: string = 'dmles.home.admin.userProfileMng';
    static ADMIN_USER_PROFILE_EDIT_GEN_INFO: string = 'dmles.home.admin.userProfileMng.editGenInfoUserProfile';
    static ADMIN_USER_PROFILE_EDIT_PERMS: string = 'dmles.home.admin.userProfileMng.editPermsUserProfile';
    static ADMIN_USER_PROFILE_EDIT_ROLES: string = 'dmles.home.admin.userProfileMng.editRolesUserProfile';
    static ADMIN_USER_PROFILE_VIEW: string = 'dmles.home.admin.userProfileMng.viewUserProfile';

    static CATALOG_SHELL:string = 'dmles.home.catalog';
    static CATALOG_FAVS:string = 'dmles.home.catalog.favs';
    static CATALOG_SEARCH:string = 'dmles.home.catalog.search';
    static CATALOG_ITEM_DETAILS:string = 'dmles.home.catalog.search.details';

    static EQUIP_RECORD_SEARCH:string = 'dmles.home.record';
    static EQUIP_RECORD_DATA_MANAGEMENT:string = 'dmles.home.recordDataManagement';
    static EQUIP_RECORD_DETAILS:string = 'dmles.home.record.details';
    static EQUIP_RECORD_DOC_SEARCH:string = 'dmles.home.record.docSearch';
    static EQUIP_RECORD_JMAR_STATUS:string = 'dmles.home.record.jmarStatus';

    static EQUIP_REQUEST_SHELL:string = 'dmles.home.request';
    static EQUIP_REQUEST_MY_REQUESTS:string = 'dmles.home.request.myRequests';
    static EQUIP_REQUEST_CRITERIA:string = 'dmles.home.request.myRequests.view.criteria';
    static EQUIP_REQUEST_HISTORY:string = 'dmles.home.request.myRequests.view.history';
    static EQUIP_REQUEST_VIEW:string = 'dmles.home.request.myRequests.view';
    static EQUIP_REQUEST_WORKFLOW_MNG:string = 'dmles.home.request.workflowMng';
    static EQUIP_REQUEST_WORKFLOW_EDIT_NEXT_LEVEL_CRITERIA:string = 'dmles.home.request.workflowMng.editNextLevelCriteria';
    static EQUIP_REQUEST_WORKFLOW_EDIT_OWNER_ROLE:string = 'dmles.home.request.workflowMng.editOwnerRole';
    static EQUIP_REQUEST_WORKFLOW_EDIT_RULES:string = 'dmles.home.request.workflowMng.editRules';

    static JMAR_SHELL:string = 'dmles.home.jmar';

    constructor() {
    }
}
