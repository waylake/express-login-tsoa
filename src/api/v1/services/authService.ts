import { envConfig } from "@/config/EnvConfig";
import jwt from "jsonwebtoken";
import { UserModel } from "@/api/v1/models/user";
import { generatePassword, validatePassword } from "@/core/utils";
import { Token, TokenPayload } from "@/core/interfaces";
import { SignUpPayload, SignInPayload } from "@/api/v1/payloads";
import { EmailService } from "@/api/v1/services/emailService";

export class AuthService {
  private userModel: typeof UserModel;

  constructor() {
    this.userModel = UserModel;
  }

  public async signIn(signInPayload: SignInPayload): Promise<Token> {
    const { email, password } = signInPayload;

    const user = await this.userModel.findOne({ email }).exec(); // Await for result
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = validatePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const tokenPayload: TokenPayload = {
      id: user._id.toString(),
      email: user.email,
    };

    const token: Token = {
      accessToken: jwt.sign(tokenPayload, envConfig.JWT_SECRET, {
        expiresIn: "1h",
      }),
      tokenPayload,
    };
    return token;
  }

  public async signUp(signupPayload: SignUpPayload): Promise<Token> {
    const { email, password } = signupPayload;

    const isUsedEmail = await this.userModel.findOne({ email }).exec(); // Await for result
    if (isUsedEmail) {
      throw new Error("Email already used");
    }

    const hashedPassword = await generatePassword(password);
    const newUser = new this.userModel({ email, password: hashedPassword });
    await newUser.save();

    const tokenPayload: TokenPayload = {
      id: newUser._id.toString(),
      email: newUser.email,
    };
    const token: Token = {
      accessToken: jwt.sign(tokenPayload, envConfig.JWT_SECRET, {
        expiresIn: "1h",
      }),
      tokenPayload,
    };

    const emailService = new EmailService();
    await emailService.sendVerificationEmail(email, token.accessToken);

    return token;
  }
}
