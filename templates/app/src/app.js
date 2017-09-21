import path from 'path';
import favicon from 'serve-favicon';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import feathers from 'feathers';
import configuration from 'feathers-configuration';
import hooks from 'feathers-hooks';
<% if (providers.includes('rest')) { %>import rest from 'feathers-rest';<% } %>
<% if (providers.includes('socketio')) { %>import socketio from 'feathers-socketio';<% } %>
<% if (providers.includes('primus')) { %>import primus from 'feathers-primus';<% } %>
import middleware from './middleware';
import base from './base';
import features from './features';
import appHooks from './app.hooks';

const app = feathers();

app.configure(configuration(path.join(__dirname, '..')));
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
app.use('/', feathers.static(app.get('public')));
app.configure(hooks());
<% if (providers.includes('rest')) { %>app.configure(rest());<% } %>
<% if (providers.includes('socketio')) { %>app.configure(socketio());<% } %>
<% if (providers.includes('primus')) { %>app.configure(primus({ transformer: 'websockets' }));<% } %>
app.configure(base);
app.configure(features);
app.configure(middleware);
app.hooks(appHooks);

export default app;
