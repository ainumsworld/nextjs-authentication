import { OAuth2Client } from "google-auth-library";

import { env } from "@/env";

export class AuthService {
  private readonly code: string;
  private readonly clientId = env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  private readonly clientSecret = env.GOOGLE_CLIENT_SECRET;

  constructor(code: string) {
    this.code = code;
  }

  public async getUserProfile() {
    try {
      const oAuth2Client = new OAuth2Client(
        this.clientId,
        this.clientSecret,
        "postmessage",
      );

      // Exchange the authorization code for tokens
      const { tokens } = await oAuth2Client.getToken(this.code);
      const idToken = tokens.id_token;

      if (!idToken) {
        throw new Error(
          "Authentication failed: No ID token returned. Ensure the provided code is valid.",
        );
      }

      // Verify the ID token and retrieve user details
      const userProfile = await oAuth2Client.verifyIdToken({
        idToken,
        audience: this.clientId,
      });
      const payload = userProfile.getPayload();

      if (!payload) {
        throw new Error(
          "Authentication failed: Unable to retrieve user profile from ID token.",
        );
      }

      if (!payload.email) {
        throw new Error(
          "Invalid user profile data. Please check the provided information.",
        );
      }
      const { email, name, picture } = payload;

      return { email, fullname: name, avatar: picture };
    } catch (err: any) {
      const errorMessage =
        err.message ||
        "An unexpected error occurred while retrieving the user profile.";
      throw new Error(errorMessage);
    }
  }
}
