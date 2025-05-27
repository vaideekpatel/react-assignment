import { encrypt, decrypt } from '@/utils/encryption';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string; 
}

const STORAGE_KEY = 'app_users';

function loadUsers(): User[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveUsers(users: User[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function findUserByEmail(email: string): User | undefined {
  return loadUsers().find(u => u.email === email);
}

export function addUser(user: Omit<User, 'id'>) {
  const users = loadUsers();
  const id = crypto.randomUUID();
  users.push({ ...user, id, password: encrypt(user.password) });
  saveUsers(users);
}

export function updateUser(id: string, updates: Partial<Omit<User, 'password'>>) {
  const users = loadUsers().map(u =>
    u.id === id ? { ...u, ...updates } : u
  );
  saveUsers(users);
}

export function changePassword(id: string, newPassword: string) {
  const users = loadUsers().map(u =>
    u.id === id ? { ...u, password: encrypt(newPassword) } : u
  );
  saveUsers(users);
}

export function validateCredentials(email: string, plainPwd: string): boolean {
  const user = findUserByEmail(email);
  if (!user) return false;
  return decrypt(user.password) === plainPwd;
}
