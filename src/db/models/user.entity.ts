import {
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  Entity,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { Message } from './message.entity';

@ObjectType('users')
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  email: string;


  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  
  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    () => Message,
    message => message.user,
  )
  messages: Message[];

}
