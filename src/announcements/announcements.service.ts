import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnnouncementsEntity } from './announcements.entity';
import { UpdateAnnouncementsDto } from './announcements.dto';
import { CACHE_PROVIDER_TOKEN, CacheInterface } from '../cache/cache.interface';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(AnnouncementsEntity)
    private readonly announcementsRepository: Repository<AnnouncementsEntity>,
    @Inject(CACHE_PROVIDER_TOKEN) private cacheManager: CacheInterface,
  ) {}

  async getAnnouncements() {
    const cacheKey = 'get-announcements';
    const cachedValue = await this.cacheManager.find(cacheKey);
    if (cachedValue) return cachedValue;

    const announcements = await this.announcementsRepository
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

    await this.cacheManager.push(cacheKey, announcements);
    return announcements;
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
    const cacheKey = 'get-announcements';
    const announcement = this.announcementsRepository.create({
      user: user.id,
      description: announcementData.description,
      image: announcementData.image,
      title: announcementData.title,
    });
    await this.cacheManager.delete(cacheKey);
    return this.announcementsRepository.save(announcement);
  }

  async updateAnnouncements(
    user: any,
    announcementData: UpdateAnnouncementsDto,
  ) {
    const cacheKey = 'get-announcements';
    const announcement = await this.announcementsRepository.findOne({
      where: {
        id: announcementData.id,
      },
    });
    if (!announcement) throw new NotFoundException('Announcement not found');

    if (announcement.user.id !== user.id)
      throw new UnauthorizedException(
        'Unauthorized action on this announcement',
      );

    await this.cacheManager.delete(cacheKey);
    Object.assign(announcement, announcementData);
    return this.announcementsRepository.save(announcement);
  }

  async deleteAnnouncements(user: any, id: number) {
    const cacheKey = 'get-announcements';
    const announcement = await this.announcementsRepository.findOne({
      where: {
        id,
      },
    });
    if (!announcement) throw new NotFoundException('Announcement not found');
    if (announcement.user.id !== user.id)
      throw new UnauthorizedException(
        'Unauthorized action on this announcement',
      );
    await this.cacheManager.delete(cacheKey);
    return this.announcementsRepository.remove(announcement);
  }
}
