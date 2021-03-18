import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import Classes from './Classes'
import Connections from './Connections'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  whatsapp: string;
  
  @Column()
  bio: string;

  @Column()
  avatar: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(type => Classes, classes => classes.user)
  classes: Classes[];

  @OneToMany(type => Connections, connections => connections.user)
    connections: Connections[];
}

export default User;
