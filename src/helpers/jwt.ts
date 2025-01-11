import { SignJWT, jwtVerify, type JWTPayload } from "jose";

type JWTContructorArgs = {
  secret: string;
  jwtIssuer: string;
  jwtAudience: string;
};

type JWTSignArgs = {
  payload: JWTPayload;
  expires: Date;
};

export class JWT {
  private readonly secret: Uint8Array;
  private readonly jwtIssuer: string;
  private readonly jwtAudience: string;
  private readonly alg = "HS256";

  constructor({ secret, jwtIssuer, jwtAudience }: JWTContructorArgs) {
    this.secret = new TextEncoder().encode(secret);
    this.jwtIssuer = jwtIssuer;
    this.jwtAudience = jwtAudience;
  }

  public async sign(args: JWTSignArgs) {
    const { payload, expires } = args;
    return new SignJWT(payload)
      .setProtectedHeader({ alg: this.alg })
      .setIssuedAt()
      .setIssuer(this.jwtIssuer)
      .setAudience(this.jwtAudience)
      .setExpirationTime(expires)
      .sign(this.secret);
  }

  public async verify(token: string) {
    return jwtVerify(token, this.secret, {
      issuer: this.jwtIssuer,
      audience: this.jwtAudience,
    });
  }
}
