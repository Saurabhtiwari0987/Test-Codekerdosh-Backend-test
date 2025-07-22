import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import bcrypt from "bcrypt";
import { Evaluator, EvaluatorDocument } from "src/database/models/evaluator.schema";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class EvaluatorService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Evaluator.name) private evaluatorModel: Model<EvaluatorDocument>,
  ) {}

  async register(email: string, password: string, phoneNumber: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newevaluator = new this.evaluatorModel({ email, password: hashedPassword, phoneNumber });
    const evaluator = await newevaluator.save()
    delete evaluator.password;
    return { message: 'evaluator registered successfully', evaluator };
  }

  async login(email: string, password: string) : Promise<any> {
    const evaluator = await this.evaluatorModel.findOne({ email }).lean().exec();
    if (!evaluator || !(await bcrypt.compare(password, evaluator.password))) {
      return { message: 'Invalid credentials' };
    }
    const payload = { email: evaluator.email };
    const token = this.jwtService.sign(payload, {secret: process.env.JWT_EVALUATOR_SECRET || ''});
    delete evaluator.password;
    return { token, evaluator };
  }

  async validateEvaluator(email: string): Promise<Evaluator | null> {
    const evaluator = await this.evaluatorModel.findOne({ email });
    return evaluator;
  }

}