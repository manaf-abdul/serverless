import { replace } from "lodash";

export class AuthorizationService {
  async validateUserToken(accessToken: string, arn: string) {
    try {
      const token = this.retrieveBearerToken(accessToken);

      console.log(token, "token")

      //Here check in DB with token
        // const db = await getDb(); 
        // const result = await db.collection('credentials').findOne({ token: token });
      const user = {id: 1} // This should come from db
      if (user) {
        return this.bearerTokenValidation(true, user.id.toString(), arn);
      }

      return this.bearerTokenValidation(false, undefined, arn);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  principalDocument = (
    principalId: string,
    effect: string,
    methodArn: string
  ) => {
    const policyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: methodArn,
        },
      ],
    };

    return { principalId, policyDocument };
  };

  retrieveBearerToken = (token: string) => {
    console.log(`Used token is ${token}`);
    return replace(token, "Bearer ", "").trimStart();
  };

  bearerTokenValidation = async (
    isAuthorized: boolean,
    userId: string,
    methodArn: string
  ) => {
    try {
      const effects = { ALLOW: "Allow", DENY: "Deny" };

      const effect = isAuthorized ? effects.ALLOW : effects.DENY;
      const principalId = effect === effects.ALLOW ? userId : "INVALID_USER";

      return this.principalDocument(principalId, effect, methodArn);
    } catch (error) {
      console.log("Failed to authorize");
      console.log(error);
      return this.principalDocument("INVALID_USER", "Deny", methodArn);
    }
  };
}
