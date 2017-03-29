/* eslint-env node */
'use strict';
const resolve = require('resolve');
const path = require('path');
const Funnel = require('broccoli-funnel');
const filterInitializers = require('fastboot-filter-initializers');

module.exports = {
  name: 'ember-leaflet-heatmap-layer',

  preconcatTree(tree) {
    return filterInitializers(tree, this.app.name);
  },

  treeForVendor: function() {
    let dist = this.pathBase('heatmap.js');
    return new Funnel(dist, { destDir: 'heatmap.js' });
  },

  included(app) {
  	this._super.included.apply(this, arguments);

  	// Addon options from the apps ember-cli-build.js
    let options = app.options[this.name] || {};

    // If the addon has the _findHost() method (in ember-cli >= 2.7.0), we'll just
    // use that.
    if (typeof this._findHost === 'function') {
      app = this._findHost();
    }

    // Otherwise, we'll use this implementation borrowed from the _findHost()
    // method in ember-cli.
    // Keep iterating upward until we don't have a grandparent.
    // Has to do this grandparent check because at some point we hit the project.
    let current = this;
    do {
     app = current.app || app;
    } while (current.parent.parent && (current = current.parent));

    // import javascript only if not in fastboot
    if (!options.excludeJS && !process.env.EMBER_CLI_FASTBOOT) {
      app.import('vendor/shims/leaflet.js');
      app.import('vendor/heatmap.js/build/heatmap.js', { using: [{ transformation: 'amd', as: 'heatmap.js' }] });
      app.import('vendor/heatmap.js/plugins/leaflet-heatmap/leaflet-heatmap.js', { using: [{ transformation: 'amd', as: 'HeatmapOverlay' }] });
    }
  },

  pathBase: function(packageName) {
    return path.dirname(resolve.sync(packageName + '/package.json', { basedir: __dirname }));
  }
};
