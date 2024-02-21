import { httpLambdaHandler, response } from "../libs/http";
import { HttpStatusCode } from "axios";

export const publicEndpoint = httpLambdaHandler<null, null>(
    async (event, _context) => {
      try {
        console.log("This is public endpoint");
        return response(HttpStatusCode.Ok, { message: "This is public endpoint" });
      } catch (error: any) {
        return response(
          HttpStatusCode.BadRequest,
          error?.message,
          "Failed"
        );
      }
    }
  );