import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersGuard } from '../users/users.guard';
import { AnnouncementsService } from './announcements.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import {
  CreateAnnouncementsDto,
  UpdateAnnouncementsDto,
} from './announcements.dto';

@Controller('announcements')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
)
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Get()
  @UseGuards(UsersGuard)
  getAnnouncements() {
    return this.announcementsService.getAnnouncements();
  }

  @Get(':id')
  @UseGuards(UsersGuard)
  getAnnouncement(@Param('id') id: number) {
    return this.announcementsService.getAnnouncement(id);
  }

  @Post()
  @UseGuards(ThrottlerGuard, UsersGuard)
  postAnnouncements(
    @Req() req: any,
    @Body() announcementData: CreateAnnouncementsDto,
  ) {
    return this.announcementsService.postAnnouncements(
      req.user,
      announcementData,
    );
  }

  @Put()
  @UseGuards(UsersGuard)
  updateAnnouncements(
    @Req() req: any,
    @Body() announcementData: UpdateAnnouncementsDto,
  ) {
    return this.announcementsService.updateAnnouncements(
      req.user,
      announcementData,
    );
  }

  @Delete(':id')
  @UseGuards(UsersGuard)
  deleteAnnouncements(@Req() req: any, @Param('id') id: number) {
    return this.announcementsService.deleteAnnouncements(req.user, id);
  }
}
