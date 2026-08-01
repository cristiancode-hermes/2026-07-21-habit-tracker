import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GoalsService } from './goals.service';

@ApiTags('goals')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('goals')
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @Get()
  findAll(@Req() req, @Query('status') status?: string) {
    return this.goalsService.findAll(req.user.id, status);
  }

  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    return this.goalsService.findOne(id, req.user.id);
  }

  @Post()
  create(@Req() req, @Body() body: { title: string; description?: string; targetCount: number; habitId: string; startDate: string; endDate: string }) {
    return this.goalsService.create(req.user.id, body);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() body: Partial<{ title: string; description: string; targetCount: number; currentCount: number; status: string }>) {
    return this.goalsService.update(id, req.user.id, body);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.goalsService.remove(id, req.user.id);
  }
}
