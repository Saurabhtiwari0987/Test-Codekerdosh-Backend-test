import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('policy')
export class PolicyController {
  @Get('privacy-policy')
  downloadPrivacyPolicyFile(@Res() res: Response) {
    const filePath = join(
      __dirname,
      '..',
      '..',
      'files',
      'CodeKerdos-Privacy-Policy.pdf',
    );
    const fileStream = createReadStream(filePath);
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition':
        'attachment; filename="CodeKerdos-Privacy-Policy.pdf"',
    });
    fileStream.pipe(res);
  }

  @Get('terms-of-use')
  downloadTermsOfUseFile(@Res() res: Response) {
    const filePath = join(
      __dirname,
      '..',
      '..',
      'files',
      'CodeKerdos-Terms-of-Service.pdf',
    );
    const fileStream = createReadStream(filePath);
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition':
        'attachment; filename="CodeKerdos-Terms-of-Service.pdf"',
    });
    fileStream.pipe(res);
  }
}
