import bcrypt from 'bcrypt';

class PasswordEncryptor {
  static async hashPassword(password: string): Promise<string> {
    if (process.env.HASH_SALT) {
      const hashedPassword = await bcrypt.hash(password, Number(process.env.HASH_SALT));
      return hashedPassword;
    }
    return '';
  }

  static async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    const match: boolean = await bcrypt.compare(password, hashedPassword);
    return match;
  }
}

export default PasswordEncryptor;