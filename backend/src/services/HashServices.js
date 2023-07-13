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
    userConfig() {
        return {
            expiresIn: process.env.JWT_EXPIRES
        }
    },

    recoverPasswordConfig(){
        return {
            expiresIn: process.env.JWT_EXPIRES_RECOVERY_PASSWORD
        }
    },

    createUserToken(payload) {
        return jwt.sign(
            { data: payload },
            process.env.JWT_SECRET,
            this.userConfig()
        );
    },

    createRecoveryToken(payload) {
        return jwt.sign(
            { data: payload },
            process.env.JWT_SECRET, 
            this.recoverPasswordConfig()
        );
    },

    createBoardToken(payload){
        return jwt.sign(
            { data: payload },
            process.env.JWT_SECRET
        );
    },

    isValid(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch(error) {
            console.log(error.name, error.message);
           return false;
        }
    }

}