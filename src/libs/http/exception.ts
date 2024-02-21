import { STATUS_CODES } from "http";
import type { ExceptionStatusCode } from "./types";

export class HttpException {
    readonly statusCode: ExceptionStatusCode;
    readonly body: any;

    constructor(statusCode: ExceptionStatusCode, body: any = "") {
        this.statusCode = statusCode;

        body = body || STATUS_CODES[statusCode];
        this.body = body;   
    }
}
