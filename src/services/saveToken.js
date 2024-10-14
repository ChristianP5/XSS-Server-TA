const { Firestore } = require('@google-cloud/firestore');
const crypto = require('crypto');
const InsertionError = require('../server/exceptions/InsertionError');

/*
    SAVE TOKEN Function
    1) Reference to Document
    2) Populate Document
    3) Save Document
*/

const saveToken = async (token) => {
    const fs = new Firestore({
        projectId: process.env.PROJECT_ID,
        databaseId: process.env.FIRESTORE_ID,
    })
    

    // 1) Reference to Document
    const tokenId = crypto.randomBytes(16).toString('hex');
    const tokenCollection = fs.collection('tokens');
    const tokenDocument = tokenCollection.doc(tokenId);


    // 2) Populate Document

    const data = {
        id: tokenId,
        createdAt: new Date(Date.now()),
        token: token,
    }

    try{
        // 3) Save Document
        const document = await tokenDocument.create(data);
        return document;

    }catch(error){
        throw new InsertionError(error.message);
    }
};


module.exports = saveToken;