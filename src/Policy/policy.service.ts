import { Injectable } from '@nestjs/common';

@Injectable()
export class PolicyService {
  async sendPrivacyPolicy(): Promise<any> {}

  async sendtermsOfUse(): Promise<any> {}
}
