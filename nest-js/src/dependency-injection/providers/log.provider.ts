import { Injectable } from '@nestjs/common';
import {red, blue, yellow} from 'chalk';

@Injectable()
export class logProvider {
    logError(message: string): void {
        console.log(red(`ERROR   [${new Date().toUTCString()}]   :   ${message}`));
    }

    logInfo(message: string): void {
        console.log(blue(`INFO    [${new Date().toUTCString()}]   :   ${message}`));
    }

    logWarn(message: string): void {
        console.log(yellow(`WARN    [${new Date().toUTCString()}]   :   ${message}`));
    }
}