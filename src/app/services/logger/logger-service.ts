import {ILogger} from "./ilogger";
import {Injectable, Optional} from "@angular/core";
import {Options} from "./options";
import {Level} from "./level";

// Temporal until https://github.com/angular/angular/issues/7344 gets fixed.
const DEFAULT_OPTIONS: Options = {
    level: Level.WARN
};

/**
    Set up the default logger. The default logger doesn't actually log anything; but, it
    provides the Dependency-Injection (DI) token that the rest of the application can use
    for dependency resolution. Each platform can then override this with a platform-
    specific logger implementation, like the FileLoggerService.
 */
@Injectable()
export class LoggerService implements ILogger {
    protected level: Level;

    // For browsers that don't implement the debug method, log will be used instead. Fixes #62.
    protected CONSOLE_DEBUG_METHOD = console["debug"] ? "debug" : "log";

    constructor(@Optional() options?: Options) {
        // Move this to the constructor definition when optional parameters are working with @Injectable: https://github.com/angular/angular/issues/7344
        let { level } = Object.assign( {}, DEFAULT_OPTIONS, options );
        this.level = level;
    }

    log(args: any): void {
    }

    info(args: any): void {
    }

    warn(args: any): void {
    }

    debug(args: any): void {
    }

    error(args: any): void {
    }

    isErrorEnabled = (): boolean => this.level >= Level.ERROR;
    isWarnEnabled = (): boolean => this.level >= Level.WARN;
    isInfoEnabled = (): boolean => this.level >= Level.INFO;
    isDebugEnabled = (): boolean => this.level >= Level.DEBUG;
    isLogEnabled = (): boolean => this.level >= Level.LOG;
}

