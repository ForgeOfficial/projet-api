import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true })
  mail: string;

  @Column()
  password: string;

  @Column({ default: 'local' })
  provider: string;
}
