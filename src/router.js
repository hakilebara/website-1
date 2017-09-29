import Router from '@ember/routing/router';
import config from '../config/environment';

export default Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
}).map(function() {
  this.route('app-shell');
  this.route('404', { path: '/*path' });
});
