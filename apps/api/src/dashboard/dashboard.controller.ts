import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DashboardService } from './dashboard.service';

@ApiTags('dashboard')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get()
  getDashboard(@Req() req) {
    return this.dashboardService.getDashboard(req.user.id);
  }

  @Get('heatmap')
  getHeatmap(@Req() req, @Query('days') days?: string) {
    return this.dashboardService.getHeatmap(req.user.id, days ? parseInt(days) : 90);
  }
}
