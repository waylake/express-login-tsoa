import { logger as Logger } from "@/config";
import { AuthService } from "@/api/v1/services/authService";
import { Tags, Post, Body, Route, Controller } from "tsoa";
import type { SignInPayload, SignUpPayload } from "@/api/v1/payloads";

@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {
  private authService: AuthService;
  private logger: typeof Logger;

  constructor() {
    super();
    this.authService = new AuthService();
    this.logger = Logger;
  }

  @Post("signin")
  public async signin(@Body() signInPayload: SignInPayload) {
    try {
      return this.authService.signIn(signInPayload);
    } catch (error) {
      this.logger.error(error);
      return { message: "Internal server error" };
    }
  }

  @Post("signup")
  public async signup(@Body() signUpPayload: SignUpPayload) {
    try {
      return this.authService.signUp(signUpPayload);
    } catch (error) {
      this.logger.error(error);
      return { message: "Internal server error" };
    }
  }
}
