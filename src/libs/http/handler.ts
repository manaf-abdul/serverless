import type { MiddyfiedHandler } from "@middy/core";
import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import { HttpStatusCode } from "axios";
import { HttpException } from "./exception";
import { response } from "./response";
import type { HttpHandlerEvent, HttpLambdaHandler } from "./types";

export const httpLambdaHandler = <TBody = null, TParam = null, TQuery = null>(
  handler: HttpLambdaHandler<TBody, TParam, TQuery>
): MiddyfiedHandler<HttpHandlerEvent<TBody, TParam, TQuery>> =>
  middy(handler)
    .use(middyJsonBodyParser())
    .use({
      onError: (handler) => {
        console.error(`[TASK_FAILD]: `, handler.error);

        if (handler.error instanceof HttpException) {
          return response(handler.error.statusCode, handler.error.body);
        }

        return response(
          HttpStatusCode.InternalServerError,
          handler.error?.message || "Failed to handle the request"
        );
      },
    });
