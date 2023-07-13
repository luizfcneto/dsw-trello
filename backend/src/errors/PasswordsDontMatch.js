class PasswordsDontMatch extends Error{
    constructor(message){
        super(message);
        this.name = "Passwords do not match Error";
        this.statusCode = 400;
    }
}

export default PasswordsDontMatch;