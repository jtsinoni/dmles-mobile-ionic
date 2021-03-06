
// IONIC:

export class ConfigMock {

    public get(): any {
        return '';
    }

    public getBoolean(): boolean {
        return true;
    }

    public getNumber(): number {
        return 1;
    }
}

export class FormMock {
    public register(): any {
        return true;
    }
}

export class LoggerServiceMock {
    public log(args: any): void {
    }

    public info(args: any): void {
    }

    public warn(args: any): void {
    }

    public debug(args: any): void {
    }

    public error(args: any): void {
    }
}

export class NetworkServiceMock {
    public checkConnection(): boolean {
        return true;
    }
}

export class AuthServiceMock {
    public checkConnection(): boolean {
        return true;
    }
}

export class UpstreamServiceMock {
    sendData(param: any): Promise<any> {
        return Promise.resolve();
    }

    pushLocalChanges(): Promise<any> {
        return Promise.resolve();
    }

    connect(): Promise<any> {
        return Promise.resolve();
    }

    disconnect(): Promise<any> {
        return Promise.resolve();
    }
}

export class UtilServiceMock {
  public isMobility(): boolean {
        return false;
    }
}

export class NavMock {

    public pop(): any {
        return new Promise(function(resolve: Function): void {
            resolve();
        });
    }

    public push(): any {
        return new Promise(function(resolve: Function): void {
            resolve();
        });
    }

    public getActive(): any {
        return {
            'instance': {
                'model': 'something',
            },
        };
    }

    public setRoot(): any {
        return true;
    }
}

export class NavParamMock {
    public get(param: string): any {
        return new Promise((resolve: Function) => {
            resolve();
        });
    }
}

export class PlatformMock {
    public ready(): any {
        return new Promise((resolve: Function) => {
            resolve();
        });
    }
}

export class MenuMock {
    public close(): any {
        return new Promise((resolve: Function) => {
            resolve();
        });
    }
}

export class AlertControllerMock {
    public close(): any {
        return new Promise((resolve: Function) => {
            resolve();
        });
    }
}

export class ModalControllerMock {
    public close(): any {
        return new Promise((resolve: Function) => {
            resolve();
        });
    }
}

export class CACServiceMock {
}

export class OAuthServiceMock {
}


export class SettingsServiceMock {    
}

export class MenuControllerMock {
  public close(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }

  public enable(shouldEnable: boolean, menuId?: string) {

  }
}

export class PopoverControllerMock {
  public close(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

export class ActionSheetControllerMock {
    public close(): any {
        return new Promise((resolve: Function) => {
            resolve();
        });
    }
}
export class AuthenticationServiceMock {
    public getToken(args: any): void {
    }

    public isLoggedIn(args: any): void {
    }

    public logout(args: any): void {
    }

    public saveToken(args: any): void {
    }
}

export class AppMock {
  public close(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

export class LoginModalServiceMock {
  public close(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

