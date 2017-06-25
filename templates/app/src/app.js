const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
// requires
<% if (providers.includes('rest')) { %>const rest = require('feathers-rest');<% } %>
<% if (providers.includes('socketio')) { %>const socketio = require('feathers-socketio');<% } %>
<% if (providers.includes('primus')) { %>const primus = require('feathers-primus');<% } %>
const middleware = require('./middleware');
const base = require('./base');
const services = require('./services');
const appHooks = require('./app.hooks');

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
// configurations
<% if (providers.includes('rest')) { %>app.configure(rest());<% } %>
<% if (providers.includes('socketio')) { %>app.configure(socketio());<% } %>
<% if (providers.includes('primus')) { %>app.configure(primus({ transformer: 'websockets' }));<% } %>
app.configure(base);
app.configure(services);
app.configure(middleware);
app.hooks(appHooks);

module.exports = app;
