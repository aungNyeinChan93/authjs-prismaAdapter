import { hash, genSalt, compare } from 'bcrypt-ts'


export async function hashPassword(password: string, salt: number = 10) {
    return await hash(password, await genSalt(salt || 10))
};

export async function checkPassword(plainStr: string, hashStr: string) {
    return await compare(plainStr, hashStr)
}