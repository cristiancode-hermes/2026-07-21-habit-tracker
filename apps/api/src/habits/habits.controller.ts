import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { HabitsService } from './habits.service';

@ApiTags('habits')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('habits')
export class HabitsController {
  constructor(private habitsService: HabitsService) {}

  @Get()
  findAll(@Req() req, @Query('includeArchived') includeArchived?: string) {
    return this.habitsService.findAll(req.user.id, includeArchived === 'true');
  }

  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    return this.habitsService.findOne(id, req.user.id);
  }

  @Post()
  create(@Req() req, @Body() body: { name: string; description?: string; frequency?: string; color?: string; icon?: string }) {
    return this.habitsService.create(req.user.id, body);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() body: Partial<{ name: string; description: string; frequency: string; color: string; icon: string }>) {
    return this.habitsService.update(id, req.user.id, body);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.habitsService.remove(id, req.user.id);
  }
}
