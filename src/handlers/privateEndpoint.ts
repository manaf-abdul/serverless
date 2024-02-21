import { getDb } from "../libs/data-source";
import { httpLambdaHandler, response } from "../libs/http";
import { HttpStatusCode } from "axios";

export const privateEndpoint = httpLambdaHandler<null, null>(
    async (event, _context) => {
      try {
        // const db = await getDb(); 
        // const result = await db.collection('myCollection').insertOne({ name: 'John' });
        console.log("This is private endpoint");
        return response(HttpStatusCode.Ok, { message: "This is private endpoint" });
      } catch (error: any) {
        return response(
          HttpStatusCode.BadRequest,
          error?.message,
          "Failed"
        );
      }
    }
  );