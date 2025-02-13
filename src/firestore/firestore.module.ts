import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirestoreService } from './firestore.service';

@Module({
    providers: [
        {
            provide: 'FIREBASE_ADMIN',
            useFactory: async () => {
                const serviceAccount = require('../../insert_firestore_key.json');
                if( !admin.apps.length){
                    admin.initializeApp({
                        credential: admin.credential.cert(serviceAccount),
                    });
                }
                return admin.firestore();
            },
        },
        FirestoreService
    ],
    exports: [FirestoreService, 'FIREBASE_ADMIN'],
})
export class FirestoreModule {}
