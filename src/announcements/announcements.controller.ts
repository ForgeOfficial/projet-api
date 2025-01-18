import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UsersGuard } from '../users/users.guard';
import { AnnouncementsService } from './announcements.service';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  @UseGuards(ThrottlerGuard, UsersGuard)
  postAnnouncements(@Req() req: any, @Body() announcementData: any) {
    return this.announcementsService.postAnnouncements(
      req.user,
      announcementData,
    );
  }
}
