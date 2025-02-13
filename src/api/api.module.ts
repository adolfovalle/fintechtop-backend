import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { FirestoreModule } from '../firestore/firestore.module';
import { DepositEntity } from '../api/entities/deposit.entity';

@Module({
  imports: [
    FirestoreModule,
    TypeOrmModule.forFeature([DepositEntity])
  ],
  controllers: [ApiController],
  providers: [ApiService]
})
export class ApiModule {}
