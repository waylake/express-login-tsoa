import { User } from "../models/interfaces/user";
import { UserModel } from "../models/user";

export class UserService {
  private userModel: typeof UserModel;

  constructor() {
    this.userModel = UserModel;
  }

  public async signin(user: User): Promise<User> {
    return this.userModel.create(user);
  }
}
