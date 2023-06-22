
export default class LoginError extends Error {
    constructor(message, attemptsRemaining){
        super(message);
        this.name = "Login Error";
        this.statusCode = 401;
        this.attemptsRemaining = attemptsRemaining;
    }

}