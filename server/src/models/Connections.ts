import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('connections')
class Connections {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(type => User, user => user.connections) 
  @JoinColumn({ name: 'user_id' })
  user: User;



  @CreateDateColumn()
  created_at: Date;

 
}

export default Connections;
