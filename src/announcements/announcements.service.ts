import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnnouncementsEntity } from './announcements.entity';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(AnnouncementsEntity)
    private readonly announcementsRepository: Repository<AnnouncementsEntity>,
  ) {}

  async postAnnouncements(user: any, announcementData: any) {
    const announcement = this.announcementsRepository.create({
      user: user.id,
      description: announcementData.description,
      image: announcementData.image,
      title: announcementData.title,
    });
    return this.announcementsRepository.save(announcement);
  }
}
