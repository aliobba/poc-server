import { Controller, Get, Logger, Param } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('api/reports')
export class ReportController {
  protected readonly logger = new Logger(ReportController.name);
  constructor(private readonly reportService: ReportService) { }

  @Get('pos/:posId')
  getReportsByPos(@Param('posId') posId: string) {
    this.logger.log(`Fetching reports for POS with ID: ${posId}`);
    return this.reportService.getReportsByPos(posId);
  }

  @Get(':id')
  getReportById(@Param('id') id: string) {
    return this.reportService.getReportById(id);
  }
}