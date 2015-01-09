'use strict';
var jquery = require('jquery-browserify');
var Backbone = require('backbone');

Backbone.$ = jquery;
global.Backbone = Backbone;

var TableView = require('./views/example-table');
new TableView();
