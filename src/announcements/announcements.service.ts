import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnnouncementsEntity } from './announcements.entity';
import { UpdateAnnouncementsDto } from './announcements.dto';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(AnnouncementsEntity)
    private readonly announcementsRepository: Repository<AnnouncementsEntity>,
  ) {}

  async getAnnouncements() {
    return this.announcementsRepository
      .createQueryBuilder('announcement')
      .leftJoinAndSelect('announcement.user', 'user')
      .select([
        'announcement.id',
        'announcement.title',
        'announcement.description',
        'announcement.image',
        'user.id',
        'user.firstname',
        'user.lastname',
      ])
      .getMany();
  }

  async getAnnouncement(id: number) {
    const announcement = await this.announcementsRepository
      .createQueryBuilder('announcement')
      .leftJoinAndSelect('announcement.user', 'user')
      .select([
        'announcement.id',
        'announcement.title',
        'announcement.description',
        'announcement.image',
        'user.id',
        'user.firstname',
        'user.lastname',
      ])
      .where('announcement.id = :id', { id })
      .getOne();

    if (!announcement) throw new NotFoundException('Announcement not found');
    return announcement;
  }

  async postAnnouncements(user: any, announcementData: any) {
    const announcement = this.announcementsRepository.create({
      user: user.id,
      description: announcementData.description,
      image: announcementData.image,
      title: announcementData.title,
    });
    return this.announcementsRepository.save(announcement);
  }

  async updateAnnouncements(
    user: any,
    announcementData: UpdateAnnouncementsDto,
  ) {
    const announcement = await this.announcementsRepository.findOne({
      where: {
        id: announcementData.id,
      },
    });
    if (!announcement) throw new NotFoundException('Announcement not found');

    if (announcement.user !== user.id)
      throw new UnauthorizedException(
        'Unauthorized action on this announcement',
      );

    Object.assign(announcement, announcementData);
    return this.announcementsRepository.save(announcement);
  }

  async deleteAnnouncements(user: any, id: number) {
    const announcement = await this.announcementsRepository.findOne({
      where: {
        id,
      },
    });
    if (!announcement) throw new NotFoundException('Announcement not found');
    if (announcement.user !== user.id)
      throw new UnauthorizedException(
        'Unauthorized action on this announcement',
      );

    return this.announcementsRepository.remove(announcement);
  }
}
