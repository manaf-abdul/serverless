import { STATUS_CODES } from "http";
import { HttpStatusCode } from "axios";
import type { APIGatewayProxyResult } from "aws-lambda";
import type { HttpResponseOptions, ResponseStatusCodes } from "./types";

const headers = {
  "Access-Control-Allow-Headers":
    "Access-Control-Allow-Origin, Content-Type, X-Amz-Date, Authorization",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS,POST",
};

export class HttpResponse implements APIGatewayProxyResult {
  readonly statusCode: number;
  readonly body: string;

  constructor(
    statusCode: ResponseStatusCodes,
    body?: any,
    message?: string,
    options: HttpResponseOptions = {}
  ) {
    this.statusCode = statusCode;

    let newBody: Record<string, unknown> = {
      statusCode,
      message,
    };
    message ||= STATUS_CODES[statusCode];

    if (
      statusCode >= HttpStatusCode.Ok &&
      statusCode < HttpStatusCode.MultipleChoices
    ) {
      newBody.data = body;
    } else {
      newBody.error = body;
    }
    this.body = JSON.stringify(body);

    if (options !== null) {
      options.headers
        ? Object.assign(options.headers, headers)
        : (options.headers = headers);

      Object.assign(this, options);
    }
  }
}

export const response = (
  statusCode: ResponseStatusCodes,
  data: any = null,
  message?: string
): APIGatewayProxyResult => {
  message ||= STATUS_CODES[statusCode];
  let body: Record<string, unknown> = {
    statusCode,
    message,
  };

  if (
    statusCode >= HttpStatusCode.Ok &&
    statusCode < HttpStatusCode.MultipleChoices
  ) {
    body.data = data;
  } else {
    body.error = data;
  }

  return { statusCode, headers, body: JSON.stringify(body) };
};
