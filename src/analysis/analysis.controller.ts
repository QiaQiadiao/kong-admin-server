import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import data from './analysis.data';
@UseGuards(AuthGuard)
@Controller('analysis')
export class AnalysisController {
  @Get('/data')
  getData() {
    return {
      code: '0',
      data,
    };
  }
}
