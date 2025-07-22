import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EvaluatorService } from './evaluator.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: EvaluatorService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ADMIN_SECRET,
    });
  }

  async validate(payload: any) {

    const admin = await this.authService.validateEvaluator(payload.username);

    return { username: admin.email };
  }
}