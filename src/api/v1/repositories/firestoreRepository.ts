import { db } from "../../../config/firebaseConfig";
import {
    FirestoreDataConverter,
    DocumentData,
    QueryDocumentSnapshot,
} from "firebase-admin/firestore";

export class FirestoreRepository<T extends DocumentData> {
    private collectionName: string;
    private converter: FirestoreDataConverter<T>;

    constructor(collectionName: string) {
        this.collectionName = collectionName;

        this.converter = {
            toFirestore(data: T): DocumentData {
                return data;
            },
            fromFirestore(snapshot: QueryDocumentSnapshot): T {
                return { id: snapshot.id, ...(snapshot.data() as any) } as T;
            }
        };
    }

    private col() {
        return db.collection(this.collectionName).withConverter(this.converter);
    }

    async getAll(): Promise<T[]> {
        const snapshot = await this.col().get();
        return snapshot.docs.map((doc) => doc.data());
    }

    async getById(id: string): Promise<T | null> {
        const ref = await this.col().doc(id).get();
        if (!ref.exists) return null;
        return ref.data() as T;
    }

    async create(data: T): Promise<T> {
        const docRef = await this.col().add(data);
        return { id: docRef.id, ...data };
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        const ref = this.col().doc(id);
        const existing = await ref.get();

        if (!existing.exists) return null;

        await ref.update(data);
        return { id, ...(existing.data() as T), ...data };
    }

    async delete(id: string): Promise<boolean> {
        const ref = this.col().doc(id);
        const existing = await ref.get();

        if (!existing.exists) return false;

        await ref.delete();
        return true;
    }
}
