import { Controller, Get, Post, Param, Query, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { EntriesService } from './entries.service';

@ApiTags('entries')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('entries')
export class EntriesController {
  constructor(private entriesService: EntriesService) {}

  @Post(':habitId/:date')
  upsert(
    @Param('habitId') habitId: string,
    @Param('date') date: string,
    @Body() body: { status: string; notes?: string },
  ) {
    return this.entriesService.upsert(habitId, date, body.status, body.notes);
  }

  @Get(':habitId')
  findByHabit(
    @Param('habitId') habitId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    if (startDate && endDate) {
      return this.entriesService.findByHabitAndRange(habitId, startDate, endDate);
    }
    return this.entriesService.findByHabitAndDate(habitId, new Date().toISOString().split('T')[0]);
  }
}
