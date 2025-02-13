import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FirestoreService } from '../firestore/firestore.service';
import { DepositEntity } from './entities/deposit.entity';


@Injectable()

export class ApiService {
    constructor(
        private readonly firestoreService: FirestoreService,
        @InjectRepository(DepositEntity)
        private depositsRepository: Repository<DepositEntity>
    ) {}

    async createGoal(goalData: { name: string; targetAmount: number }) {
        const goal = {
            ...goalData,
            createdAt: new Date()
        };
        
        const goalId = await this.firestoreService.addDocument('goals', goal);
        return { ...goal, id: goalId };
    }
    
    async createDeposit(deposit: { goalId: string; amount: number }) {
        const depositData = {
            ...deposit,
            createdAt: new Date()
        };
        const depositId = await this.firestoreService.addDocument('deposits', depositData);

        const depositEntity = this.depositsRepository.create({
            goalId: deposit.goalId,
            amount: deposit.amount
        });
        await this.depositsRepository.save(depositEntity);

        return { ...depositData, id: depositId };
    }

    async getDepositsByGoalId(goalId: string): Promise<any>{
        const deposits = await this.firestoreService.getAllDocuments('deposits');
        return deposits.filter((deposit: any) => deposit.goalId === goalId);
    }

    async getAllGoals(): Promise<any>{
        return this.firestoreService.getAllDocuments('goals');
    }
    
}
