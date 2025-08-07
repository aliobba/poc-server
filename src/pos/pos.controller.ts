import { Controller, Get, Param } from '@nestjs/common';
import { PosService } from './pos.service';

@Controller('api/pos')
export class PosController {
  constructor(private readonly posService: PosService) { }

  @Get()
  getAllPos() {
    return this.posService.getAllPos();
  }

  @Get('company/:id')
  getAllPosByCompanyId(@Param('id') companyId: string) {
    return this.posService.getAllPosByCompanyId(companyId);
  }

  @Get(':id')
  getPos(@Param('id') id: string) {
    return this.posService.getPosById(id);
  }
}
