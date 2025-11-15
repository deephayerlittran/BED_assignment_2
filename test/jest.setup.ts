// test/jest.setup.ts

// ---- TYPES FOR SAFE COLLECTION NAMES ---- //
type Collections = "branches" | "employees";

interface MockDB {
    branches: Record<string, any>;
    employees: Record<string, any>;
}

// ---- IN-MEMORY MOCK DATABASE ---- //
const mockData: MockDB = {
    branches: {},
    employees: {},
};

let autoId = 1;

// ---- FIREBASE MOCK (FIRESTORE + AUTH) ---- //
jest.mock("../src/config/firebaseConfig", () => ({
    db: {
        collection: (collectionName: Collections) => ({
            doc: (id?: string) => ({
                get: jest.fn(async () => {
                    const data = mockData[collectionName][id!];
                    return {
                        exists: !!data,
                        data: () => data || null,
                        id,
                    };
                }),
                update: jest.fn(async (updateData: any) => {
                    if (!mockData[collectionName][id!]) return null;
                    mockData[collectionName][id!] = {
                        ...mockData[collectionName][id!],
                        ...updateData,
                    };
                }),
                delete: jest.fn(async () => {
                    delete mockData[collectionName][id!];
                }),
            }),

            add: jest.fn(async (newData: any) => {
                const id = (autoId++).toString();
                mockData[collectionName][id] = { id, ...newData };
                return { id };
            }),

            get: jest.fn(async () => {
                return {
                    docs: Object.entries(mockData[collectionName]).map(([id, data]) => ({
                        id,
                        data: () => data,
                    })),
                };
            }),
        }),
    },

    auth: {
        verifyIdToken: jest.fn(),
        getUser: jest.fn(),
    },
}));

// ---- CLEAN MOCK DB BEFORE EACH TEST ---- //
beforeEach(() => {
    mockData.branches = {};
    mockData.employees = {};
    autoId = 1;
});
