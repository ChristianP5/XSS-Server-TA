const Hapi = require('@hapi/hapi');
const path = require('path');
const dotenv = require('dotenv');
const routes = require('./routes');

dotenv.config();

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: '0.0.0.0',
        routes : {
            cors : {
                origin: ['*'],
            },
            files: {
                relativeTo: path.join(__dirname, 'public'),
            }
        }
    });

    await server.register( [
        {
            plugin: require('@hapi/inert'),
        },
        {
            plugin: require('@hapi/vision'),
        }
    ] )

    await server.views({
        engines: {
            ejs: require('ejs'),
        },
        path: path.join(__dirname, 'public'),
    })

    server.route(routes);

    server.ext('onPreResponse', (request, h) => {
        const response = request.response;

        if(response instanceof Error){
            const errorResponse = h.response({
                status: 'fail',
                message: response.message,
                error: response.stack,
            }).code(500);

            return errorResponse;
        }

        return h.continue;
    })


    await server.start();

    console.log(`Server Started at ${server.info.uri}`);
}

process.on('unhandledRejection', (error) => {
    console.error(error.stack);
    process.exit(1);
})

init();