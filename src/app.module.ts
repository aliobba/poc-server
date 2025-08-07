import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from './env/env.module';
import { PinModule } from './pin/pin.module';
import { PosModule } from './pos/pos.module';
import { ReportModule } from './report/report.module';
import { TwoFactorAuthModule } from './two-factor-auth/two-factor-auth.module';

@Module({
  imports: [
    ReportModule, 
    PosModule,
    ConfigModule.forRoot(),
    EnvModule,
    TwoFactorAuthModule,
    PinModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
