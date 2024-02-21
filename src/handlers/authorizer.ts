import { Context, Handler } from "aws-lambda";
import { AuthorizationService } from "../services/AuthorizationService";

export const userGate: Handler = async (event, _context: Context) => {
    const accessToken: any = event.authorizationToken;
    const arn = event.methodArn as string;
  
    console.log(`ARN ${arn}`);
  
    const service = new AuthorizationService();
    const response = await service.validateUserToken(accessToken, arn);
  
    console.log(response);
  
    return response;
  };