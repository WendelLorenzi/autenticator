import bcrypt from 'bcrypt';

class PasswordEncryptor {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  static async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    const match: boolean = await bcrypt.compare(password, hashedPassword);
    return match;
  }
}

export default PasswordEncryptor;