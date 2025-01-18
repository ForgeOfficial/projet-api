import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';
import { UsersEntity } from '../users/users.entity';

@Entity('announcements')
export class AnnouncementsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @ManyToOne(() => UsersEntity, (user) => user.id, { eager: true })
  user: UsersEntity;

  @VersionColumn()
  version: number;
}
