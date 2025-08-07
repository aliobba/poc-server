import { Body, Controller, Post } from "@nestjs/common";
import { PinService } from "./pin.service";

@Controller('api/pin/')
export class PinController {
    constructor(private readonly pinService: PinService) { }

    // Endpoint to verify the PIN
    @Post('verify')
    async verifyPin(@Body('email') email: string, @Body('pin') pin: string): Promise<{ isValidPin: boolean }> {
        return this.pinService.verifyPin(email, pin);
    }
}