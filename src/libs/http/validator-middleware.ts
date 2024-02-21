import { HttpStatusCode } from "axios";
import { HttpException } from "./exception";
import type { ClassConstructor } from "./types";

export const httpValidator = (
  ValidationModel: ClassConstructor<any>,
  validateOn: "body" | "pathParameters" | "queryStringParameters"
) => {
  const before = ({ event }: any) => {
    try {
      new ValidationModel(event[validateOn]);
    } catch (error: any) {
      throw new HttpException(HttpStatusCode.BadRequest, error?.message);
    }
  };

  return { before };
};
