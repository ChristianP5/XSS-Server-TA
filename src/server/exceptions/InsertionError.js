class InsertionError extends Error{
    constructor(message){
        super(message);
        this.name = "InsertionError";
        this.code = 400;
    }
}

module.exports = InsertionError;