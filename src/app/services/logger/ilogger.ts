/**
 * An interface all loggers must implement.
 */
export interface ILogger {
    log(message: any): void;
    info(message: any): void;
    warn(message: any): void;
    debug(message: any): void;
    error(message: any): void;
}
