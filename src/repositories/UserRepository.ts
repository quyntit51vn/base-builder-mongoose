import { IUser } from "../model/interface/IUser";
import User from "../model/user";
import { BaseRepository } from "./BaseRepository";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export class UserRepository extends BaseRepository<IUser> {
  private static instance: UserRepository;

  private constructor() {
    super();
    this.model = User;
  }

  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }

    return UserRepository.instance;
  }
  async signup(item: any) {
    try {
      const { first_name, last_name, email, password } = item;
      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = await this.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });

      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET_DEVELOPMENT,
        {
          expiresIn: "7d",
        }
      );
      user.token = token;
      return user;
    } catch (error) {
      return error;
    }
  }

  async login(item: IUser) {
    try {
      const { email, password } = item;
      const user = await this.findOne({
        $eq: {
          email: email,
          password: password,
        },
      });
      if (!user) {
      }
      const isPasswordMatching = await bcrypt.compare(password, user.password);
      if (isPasswordMatching) {
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.JWT_SECRET_DEVELOPMENT,
          {
            expiresIn: "7d",
          }
        );
        user.token = token;
        user.password = undefined;
        return user;
      }
    } catch (error) {
      return error;
    }
  }
}
