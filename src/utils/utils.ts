import * as bcrypt from 'bcrypt';

export const encryptPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
}

export const comparePassword = (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
}