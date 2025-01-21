import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('jwtBlacklist')
export class JwtBlacklistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jwt: string;
}
