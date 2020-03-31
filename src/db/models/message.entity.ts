import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@ObjectType('Message', {
  isAbstract: false,
  description: 'Mensagens enviadas por usuários',
})
@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  content: string;

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @UpdateDateColumn()
  @Field()
  updated_at: Date;

  @Column({ name: 'user_id' })
  @Field()
  userId: number;

  @Field(() => User,{
    description : 'Usuário dono da mensagen'
  })
  @ManyToOne(() => User, user => user.messages)
  user: User;
  

}
