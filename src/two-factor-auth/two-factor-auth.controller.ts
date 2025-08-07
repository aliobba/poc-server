import { Controller, Get, Query, Post, Body, Logger } from '@nestjs/common';
import { TwoFactorAuthService } from './two-factor-auth.service';

@Controller('api/2fa/')
export class TwoFactorAuthController {

  private readonly logger = new Logger(TwoFactorAuthController.name);

  constructor(private readonly twoFAService: TwoFactorAuthService) { }

  // Endpoint pour initialiser la 2FA (génère secret + QR code)
  @Get('generate')
  async generate(@Query('email') email: string) {
    this.logger.log(`Generating 2FA for email: ${email}`);
    if (!email) {
      throw new Error('Email is required');
    }

    // Génération du secret et de l'URL OTP Auth
    // Vous pouvez utiliser un service pour générer le secret et l'URL OTP Auth
    const secret = this.twoFAService.generateSecret();
    const otpauthUrl = this.twoFAService.generateOtpAuthUrl(email, secret);
    const qrCodeDataUrl = await this.twoFAService.generateQrCodeDataUrl(otpauthUrl);

    return {
      secret,
      otpauthUrl,
      qrCodeDataUrl,
    };
  }

  // Endpoint pour vérifier le code
  /* @Post('verify')
  async verify(@Body() body: { token: string; secret: string }) {
    const isValid = this.twoFAService.verifyToken(body.token, body.secret);
    return { isValid };
  } */

  // Endpoint pour envoyer un OTP par email
  @Post('email/send')
  async sendOtp(@Body('email') email: string) {
    await this.twoFAService.generateAndSendOtp(email);
    return { message: 'OTP envoyé à votre email' };
  }

  // Endpoint pour vérifier l'OTP envoyé par email
  @Post('email/verify')
  async verifyOtp(@Body('email') email: string, @Body('otp') otp: string) {
    const isValid = this.twoFAService.verifyOtp(email, otp);
    console.log("isValid", isValid);

    return { valid: isValid };
  }

  @Post('auth')
  auth(@Body() user: Record<string, string>): Promise<Record<string, boolean>> {
    Logger.log('Verifying user authentication', 'AuthController');
    Logger.log(`User: ${JSON.stringify(user)}`, 'AuthController');
    return this.twoFAService.CheckAuthentication(user);
  }

}
