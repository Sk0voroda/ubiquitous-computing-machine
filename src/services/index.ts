import PocketBase from 'pocketbase';

// TODO: move to env
const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

const COLLECTIONS = {
  TODOS: 'todos',
  USERS: 'users',
} as const;

type Collections = typeof COLLECTIONS[keyof typeof COLLECTIONS];

export const collection = (name: Collections) => pb.collection(name);
export const { authStore } = pb;
