import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import bcrypt from "bcrypt";
import { Admin, AdminDocument } from "src/database/models/admin.schema";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AdminService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  async register(email: string, password: string, phoneNumber: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new this.adminModel({ email, password: hashedPassword, phoneNumber });
    const admin = await newAdmin.save()
    delete admin.password;
    return { message: 'Admin registered successfully', admin };
  }

  async login(email: string, password: string) : Promise<any> {
    const admin = await this.adminModel.findOne({ email }).lean().exec();
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return { message: 'Invalid credentials' };
    }
    const payload = { email: admin.email };
    const token = this.jwtService.sign(payload, {secret: process.env.JWT_ADMIN_SECRET});
    delete admin.password;
    return { token, admin };
  }

  async validateAdmin(email: string): Promise<Admin | null> {
    const admin = await this.adminModel.findOne({ email });
    return admin;
  }

}