import {
  findUserByEmail,
  addUser,
  validateCredentials,
  updateUser,
  changePassword,
  User,
} from './authService';

describe('authService (localStorage)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should add a user and retrieve it by email', () => {
    const plain = { firstName: 'A', lastName: 'B', email: 'x@x.com', mobile: '123', password: 'P@s5w0rd!' };
    addUser(plain);
    const user = findUserByEmail('x@x.com');
    expect(user).toBeDefined();
    expect(user!.email).toBe('x@x.com');
    expect(validateCredentials('x@x.com', 'P@s5w0rd!')).toBe(true);
  });

  it('should return false for invalid credentials', () => {
    addUser({ firstName: '', lastName: '', email: 'a@b.com', mobile: '', password: 'Secret1!' });
    expect(validateCredentials('a@b.com', 'WrongPass')).toBe(false);
    expect(validateCredentials('noone@x.com', 'Secret1!')).toBe(false);
  });

  it('should update a user profile', () => {
    addUser({ firstName: 'Old', lastName: 'Name', email: 'u@u.com', mobile: '000', password: 'T3st!!ng' });
    const u = findUserByEmail('u@u.com')! as User;
    updateUser(u.id, { firstName: 'New', mobile: '999' });
    const updated = findUserByEmail('u@u.com')!;
    expect(updated.firstName).toBe('New');
    expect(updated.mobile).toBe('999');
  });

  it('should change password correctly', () => {
    addUser({ firstName: '', lastName: '', email: 'pw@pw.com', mobile: '', password: 'OldPass1!' });
    const u = findUserByEmail('pw@pw.com')! as User;
    expect(validateCredentials('pw@pw.com', 'OldPass1!')).toBe(true);
    changePassword(u.id, 'NewPass2@');
    expect(validateCredentials('pw@pw.com', 'OldPass1!')).toBe(false);
    expect(validateCredentials('pw@pw.com', 'NewPass2@')).toBe(true);
  });
});
