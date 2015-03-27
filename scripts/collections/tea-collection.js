'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var sortMixin = require('yoga-tables').collectionMixin;
var filterMixin = require('yoga-tables').collectionFilter;

var ExampleCollection = Backbone.Collection.extend({
  initialize: function() {
    _.extend(this, sortMixin); 
    _.extend(this, filterMixin); 
  },
});

module.exports = ExampleCollection;
