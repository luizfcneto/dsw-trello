class BoardAlreadyExistsError extends Error{
    constructor(message){
        super(message);
        this.name = "Board Already Exists Error";
        this.statusCode = 409;
    }
}

export default BoardAlreadyExistsError;