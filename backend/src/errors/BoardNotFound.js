class BoardNotFoundError extends Error{
    constructor(message){
        super(message);
        this.name = "Board Not Found Error";
        this.statusCode = 404;
    }
}

export default BoardNotFoundError;