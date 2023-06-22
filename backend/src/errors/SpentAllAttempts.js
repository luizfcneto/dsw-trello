
export default class SpentAllAttemptsError extends Error {
    constructor(message){
        super(message);
        this.name = "Spent All Attempts Error";
        this.statusCode = 401;
    }
}