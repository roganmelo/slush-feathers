<% if (requiresAuth) { %>
import { hooks } from 'feathers-authentication';

const { authenticate } = hooks;
<% } %>

export default {
  before: {
    all: [<% if (requiresAuth) { %> authenticate('jwt') <% } %>],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
