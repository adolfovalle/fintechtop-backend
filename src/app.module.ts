import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirestoreService } from './firestore/firestore.service';
import { FirestoreController } from './firestore/firestore.controller';
import { FirestoreModule } from './firestore/firestore.module';
import { ApiModule } from './api/api.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true,}),FirestoreModule, ApiModule, DatabaseModule],
  controllers: [AppController, FirestoreController],
  providers: [AppService, FirestoreService],
})
export class AppModule {}
