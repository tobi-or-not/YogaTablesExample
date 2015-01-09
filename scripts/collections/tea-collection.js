'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var sortMixin = require('table-lib').collectionMixin;

var ExampleCollection = Backbone.Collection.extend({
  initialize: function() {
    _.extend(this, sortMixin); 
  },
});

module.exports = ExampleCollection;
