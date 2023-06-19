class UserNotFoundError extends Error{
    constructor(message){
        super(message);
        this.name = "User Not Found Error";
        this.statusCode = 404;
    }
}

export default UserNotFoundError;