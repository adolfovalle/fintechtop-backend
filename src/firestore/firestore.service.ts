import { Injectable , Inject} from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';

@Injectable()
export class FirestoreService {
    constructor(@Inject("FIREBASE_ADMIN") private firestore: Firestore) {}

    async addDocument(collection: string, data: any): Promise<any>{
        const docRef = await this.firestore.collection(collection).doc();
        const doc = await docRef.set(data);
        return docRef.id;
    }

    async getDocument(collection: string, id: string): Promise<any>{
        const doc = await this.firestore.collection(collection).doc(id).get();
        if (!doc.exists){
            throw new Error('Document does not exist');
        }
        return doc.data();
    }

    async getAllDocuments(collection: string): Promise<any[]>{
        const alldocs = await this.firestore.collection(collection).get();
        return alldocs.docs.map((doc) => doc.data());
    }

}
