const { Firestore } = require('@google-cloud/firestore');
const NotFoundError = require('../server/exceptions/NotFoundError');


/*
    Get Tokens Function
    1) Reference to Collection
    2) Get all Documents from Collection
*/
const getTokens = async () => {
    const fs = new Firestore({
        databaseId: process.env.FIRESTORE_ID,
        projectId: process.env.PROJECT_ID,
    });

    // 1)
    const tokensCollection = fs.collection('tokens');

    // 2)
    try{
        const tokens = [];
        const documents = await tokensCollection.get();
        documents.forEach(document => {
            tokens.push(document.data());
        })

        return tokens;
    }catch(error){
        throw new NotFoundError(error.message);
    }
    
};

module.exports = getTokens;