import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FirestoreService } from './firestore.service';

@Controller('firestore')
export class FirestoreController {

    constructor(private readonly firestoreService: FirestoreService) {}

    @Post('add/:collection')
    async addDocument(@Param('collection') collection: string, @Body() data: any): Promise<any>{
        return this.firestoreService.addDocument(collection, data);
    }

    @Get('get/:collection/:id')
    async getDocument(@Param('collection') collection: string, @Param('id') id: string): Promise<any>{
        return this.firestoreService.getDocument(collection, id);
    }

    @Get('getall/:collection')
    async getAllDocuments(@Param('collection') collection: string): Promise<any[]>{
        return this.firestoreService.getAllDocuments(collection);
    }
    
}
