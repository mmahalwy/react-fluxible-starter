/**
 * This leverages Express to create and run the http server.
 * A Fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */

// Express
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';
import serialize from 'serialize-javascript';
import logger from 'morgan';

// React
import React from 'react';
import {navigateAction} from 'fluxible-router';
import app from './app';
import HtmlComponent from 'components/Html';
import { createElementWithContext } from 'fluxible-addons-react';
const htmlComponent = React.createFactory(HtmlComponent);

// Process
const env = process.env.NODE_ENV;
import debugLib from 'debug';
const debug = debugLib('new-pirate');

// Server setup
const server = express();
server.use('/public', express.static(path.join(__dirname, '/build')));
server.use('/images', express.static(path.join(__dirname, '/static/images')));
server.use(compression());
server.use(bodyParser.json());
server.use(logger('dev'));

// Initial route
server.use((req, res, next) => {
    let context = app.createContext();

    debug('Executing navigate action');
    context.getActionContext().executeAction(navigateAction, {
        url: req.url
    }, (err) => {
        if (err) {
            if (err.statusCode && err.statusCode === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }

        debug('Exposing context state');
        const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        debug('Rendering Application component into html');
        const html = React.renderToStaticMarkup(htmlComponent({
            clientFile: env === 'production' ? 'main.min.js' : 'main.js',
            styleFile: env === 'production' ? 'main.min.css' : 'main.css',
            context: context.getComponentContext(),
            state: exposed,
            markup: React.renderToString(createElementWithContext(context))
        }));

        debug('Sending markup');
        res.type('html');
        res.write('<!DOCTYPE html>' + html);
        res.end();
    });
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log('Application listening on port ' + port);

export default server;
