import { db } from "../../../../config/firebaseConfig";

export class FirestoreRepository<T> {
    private collectionName: string;

    constructor(collectionName: string) {
        this.collectionName = collectionName;
    }

    async getAll(): Promise<T[]> {
        const snapshot = await db.collection(this.collectionName).get();
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T[];
    }

    async getById(id: string): Promise<T | null> {
        const ref = await db.collection(this.collectionName).doc(id).get();
        if (!ref.exists) return null;
        return { id: ref.id, ...ref.data() } as T;
    }

    async create(data: T): Promise<T> {
        const docRef = await db.collection(this.collectionName).add(data);
        return { id: docRef.id, ...data };
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        const ref = db.collection(this.collectionName).doc(id);
        const existing = await ref.get();

        if (!existing.exists) return null;

        await ref.update(data);
        return { id, ...data } as T;
    }

    async delete(id: string): Promise<boolean> {
        const ref = db.collection(this.collectionName).doc(id);
        const existing = await ref.get();

        if (!existing.exists) return false;

        await ref.delete();
        return true;
    }
}
