import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('deposits')
export class DepositEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  goalId: string;

  @Column('decimal')
  amount: number;

  @CreateDateColumn()
  createdAt: Date;
}