import { Module } from '@nestjs/common';
import { PinController } from './pin.controller';
import { PinService } from './pin.service';

// NOTE - PinModule is responsible for handling PIN-related functionalities
@Module({
    imports: [],
    controllers: [PinController],
    providers: [PinService],
})
export class PinModule { }
