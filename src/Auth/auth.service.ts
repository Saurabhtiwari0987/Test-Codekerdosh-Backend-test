import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../database/models/user.schema';
import {
  PaymentHistory,
  PaymentHistoryDocument,
} from 'src/database/models/payment-history.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(PaymentHistory.name)
    private paymentHistoryModel: Model<PaymentHistoryDocument>,
  ) {}

  async register(
    username: string,
    password: string,
    phoneNumber: string,
    name: string,
  ) {
    // check if user already exists
    const isUserExisting = await this.userModel.findOne({ username });
    if (isUserExisting) {
      return { message: 'User already registered', user: isUserExisting };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      username,
      password: hashedPassword,
      phoneNumber,
      name,
    });
    const user = await newUser.save();
    delete user.password;
    return { message: 'User registered successfully', user };
  }

  async login(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username }).lean().exec();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { message: 'Invalid credentials' };
    }
    const payload = { username: user.username };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_USER_SECRET,
    });
    delete user.password;
    return { token, user };
  }

  async validateUser(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username });
    return user;
  }

  async assignCourseToUser(courseId: string, userId: string) {
    const user = await this.userModel.findById(userId);

    user.courses.push(new Types.ObjectId(courseId));

    console.log(user);

    await user.save();

    const updatedUser = await this.userModel
      .findById(userId)
      .populate('courses');

    console.log(updatedUser);

    delete updatedUser.password;
    return updatedUser;
  }

  async getUserCourses(userId: string) {
    const user = await this.userModel.findById(userId).populate('courses');
    return user.courses;
  }

  async getUserInfo(userId: string) {
    const user = await this.userModel.findById(userId);
    delete user.password;
    return user;
  }

  async addPaymentHistory(body: PaymentHistory) {
    const paymentHistory = await this.paymentHistoryModel.create(body);
    return paymentHistory;
  }
}
