import type {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Handler,
} from "aws-lambda";
import { HttpStatusCode } from "axios";

export type ClassConstructor<T = {}> = new (...args: any[]) => T;

export type HttpHandlerEvent<TBody = null, TParam = null, TQuery = null> = Omit<
    APIGatewayProxyEvent,
    "body" | "pathParameters" | "queryStringParameters"
> & {
    body: TBody;
    pathParameters: TParam;
    queryStringParameters: TQuery;
};

export type HttpLambdaHandler<
    TBody = null,
    TParam = null,
    TQuery = null
> = Handler<HttpHandlerEvent<TBody, TParam, TQuery>, APIGatewayProxyResult>;

export type HttpResponseOptions = Omit<
    APIGatewayProxyResult,
    "statusCode" | "body"
>;

export type ExceptionStatusCode =
    | 300
    | 301
    | 302
    | 303
    | 304
    | 305
    | 307
    | 308
    | 400
    | 401
    | 402
    | 403
    | 404
    | 405
    | 406
    | 407
    | 408
    | 409
    | 410
    | 411
    | 412
    | 413
    | 414
    | 415
    | 416
    | 417
    | 418
    | 421
    | 422
    | 423
    | 424
    | 425
    | 426
    | 428
    | 429
    | 431
    | 451
    | 500
    | 501
    | 502
    | 503
    | 504
    | 505
    | 506
    | 507
    | 508
    | 509
    | 510
    | 511;

export type ResponseStatusCodes =
    | HttpStatusCode
    | 200
    | 201
    | 202
    | 203
    | 204
    | 205
    | 206
    | 207
    | 208
    | 226
    | ExceptionStatusCode;
