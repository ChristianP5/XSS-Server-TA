const handlers = require('./handlers');
const {
    getRootHandler, getTokensPageHandler, saveTokenHandler,
    getAllTokensHandler
 } = require('./handlers');

const path = require('path');

const routes = [
    // Utils
    {
        method: 'GET',
        path: '/',
        handler: getRootHandler,
    },
    {
        method: 'GET',
        path: '/files/{filename*}',
        handler: {
            directory: {
                path: path.join(__dirname, 'public'),
                index: ['index.ejs'],
            }
        }
    },
    // API
    {
        method: 'GET',
        path: '/api/{token}',
        handler: saveTokenHandler
    },
    {
        method: 'GET',
        path: '/api/tokens',
        handler: getAllTokensHandler
    },
    // Pages
    {
        method: 'GET',
        path: '/tokens',
        handler: getTokensPageHandler,
    }
];

module.exports = routes;