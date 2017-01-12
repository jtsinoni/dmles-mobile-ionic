import {ILogger} from "./ilogger";
import {Injectable} from "@angular/core";

/**
    Set up the default logger. The default logger doesn't actually log anything; but, it
    provides the Dependency-Injection (DI) token that the rest of the application can use
    for dependency resolution. Each platform can then override this with a platform-
    specific logger implementation, like the FileLoggerService.
 */

@Injectable()
export class LoggerService implements ILogger {


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
}

