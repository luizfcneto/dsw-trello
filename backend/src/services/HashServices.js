import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtConfig = {
    expiresIn: "2h"
}

export const encript = async (word) => {
    return await bcrypt.hash(word, parseInt(process.env.HASH_SALT_BCRYPT));
}

export const compare = async (word, wordHashed) => {
    return await bcrypt.compare(word, wordHashed);
}

export const createJwt = (payload) => {
    return jwt.sign({ data: payload}, process.env.JWT_SECRET, jwtConfig);
}