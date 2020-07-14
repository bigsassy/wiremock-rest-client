import { LogLevelDesc } from 'loglevel';

export interface Options {

  logLevel?: LogLevelDesc;

  proxy?: string;

  continueOnFailure?: boolean;

  headers?: { [key: string]: any };
}
