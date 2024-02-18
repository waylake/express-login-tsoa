import { logger as Logger } from "@/config";
import { UserService } from "@/api/v1/services/userService";
import { Tags, Post, Body, Route, Controller } from "tsoa";
import type { User } from "@/api/v1/models/interfaces";

@Route("user")
@Tags("User")
export class UserController extends Controller {
  private userService: UserService;
  private logger: typeof Logger;

  constructor() {
    super();
    this.userService = new UserService();
    this.logger = Logger;
  }

  @Post()
  public async signup(@Body() user: User) {
    try {
      return this.userService.signin(user);
    } catch (error) {
      this.logger.error(error);
      return { message: "Internal server error" };
    }
  }
}
