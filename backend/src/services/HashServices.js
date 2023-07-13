import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const BCRYPT = {
    async encript(word) {
        return await bcrypt.hash(word, parseInt(process.env.HASH_SALT_BCRYPT));
    },

    async compare(word, encriptedWord){
        return await bcrypt.compare(word, encriptedWord);
    }
}

export const JWT = {
    config() {
        return {
            expiresIn: process.env.JWT_EXPIRES
        }
    },

    create(payload) {
        return jwt.sign(
            { data: payload },
            process.env.JWT_SECRET,
            JWT.config()
        );
    },

    createRecoveryToken(payload) {
        console.log(payload);
        return jwt.sign(
            { data: payload },
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRES_RECOVERY_PASSWORD },
        );
    },

    isValid(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch(error) {
           return false;
        }
    }

}