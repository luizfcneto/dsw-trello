class UserAlreadyExistsError extends Error{
    constructor(message){
        super(message);
        this.name = "User Already Exists Error";
        this.statusCode = 409;
    }
}

export default UserAlreadyExistsError;