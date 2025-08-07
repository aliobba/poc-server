import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common';

import * as QRCode from 'qrcode';
import * as nodemailer from 'nodemailer';
import { authenticator } from 'otplib';

import { EnvService } from '../env/env.service';


@Injectable()
export class TwoFactorAuthService implements OnModuleInit {
  private readonly logger = new Logger(TwoFactorAuthService.name);

  private readonly transporter: nodemailer.Transporter;

  private readonly otpStore = new Map<string, string>();

  private readonly userStore = new Map<string, string>();

  // Inject the EnvService to access environment variables
  constructor(private readonly envService: EnvService) {
    this.transporter = nodemailer.createTransport({
      host: this.envService.mailHost,
      port: this.envService.mailPort,
      secure: this.envService.mailSecure,
      auth: {
        user: this.envService.mailUser,
        pass: this.envService.mailPass,
      },
      logger: this.envService.mailLogger,
      debug: this.envService.mailDebug,
    });
  }
  onModuleInit() {
    this.userStore.set(this.envService.userAuthEmail(), this.envService.userAuthPass);
    this.userStore.set(this.envService.userAuthEmail('1'), this.envService.userAuthPass);
    this.userStore.set(this.envService.userAuthEmail('2'), this.envService.userAuthPass);
    this.userStore.set(this.envService.userAuthEmail('3'), this.envService.userAuthPass);
  }

  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendEmail(email: string, otp: string): Promise<void> {

    await this.transporter.sendMail({
      from: `"Field Force" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Votre code de vérification OTP',
      html: `<p>Votre code de vérification est : <strong>${otp}</strong></p>`,
    });
  }

  async CheckAuthentication(user: Record<string, string>): Promise<Record<string, boolean>> {
    this.logger.log(`Checking if 2FA is enabled for user: ${user.email}`);
    const userPassword = this.userStore.get(user.email);

    if (userPassword && user.password === userPassword) {
      await this.generateAndSendOtp(user.email);
      return { checkAuth: true };
    }

    return { checkAuth: false };
  }

  // Génère et envoie un OTP
  async generateAndSendOtp(email: string): Promise<void> {
    const otp = this.generateOtp();
    this.logger.log(`Generated OTP for ${email}: ${otp}`);
    // Stocke l'OTP en mémoire pour vérification ultérieure
    this.otpStore.set(email, otp);
    setTimeout(() => this.otpStore.delete(email), 5 * 60 * 1000); // Expire après 5 min
    await this.sendEmail(email, otp);
  }

  // Vérifie l'OTP
  verifyOtp(email: string, otp: string): boolean {
    const storedOtp = this.otpStore.get(email);

    // test bypass for development purposes play store validation
    if (email === this.envService.userAuthEmail() && otp === '000000') return true; // Bypass pour tests

    console.log("Stored OTP:", storedOtp, "Provided OTP:", otp);
    if (!storedOtp || storedOtp !== otp) {
      throw new BadRequestException('OTP invalide ou expiré');
    }
    this.otpStore.delete(email);
    return true;
  }

  // Générer un secret unique pour l'utilisateur
  generateSecret() {
    return authenticator.generateSecret();
  }

  // Créer une URL compatible avec Google Authenticator (otpauth://...)
  generateOtpAuthUrl(email: string, secret: string) {
    const appName = 'MonApp'; // Nom affiché dans Google Authenticator
    return authenticator.keyuri(email, appName, secret);
  }

  // Générer un QR code (format Data URL) à partir de l'otpauth URL
  async generateQrCodeDataUrl(otpauthUrl: string): Promise<string> {
    return QRCode.toDataURL(otpauthUrl);
  }

  // Vérifier un code OTP saisi par l'utilisateur
  verifyToken(token: string, secret: string): boolean {
    return authenticator.verify({ token, secret });
  }
}
