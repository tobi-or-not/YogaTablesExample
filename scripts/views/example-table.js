'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var TeaCollection = require('../collections/tea-collection');
var Table = require('table-lib').Table;
var TableTemplate = require('../templates/template.ejs');

var ExampleTableView = Backbone.View.extend({
  el: '.table-container',
  template: _.template(TableTemplate),

  events: {
    'click th': 'onClickHead'
  },

  initialize: function() {
    var data = [
      { name: 'Sencha', origin: 'Japan', brewTemperatur: '75' },
      { name: 'Gunpowder', origin: 'China', brewTemperatur: 80 }
    ];

    // data
    this.teaCollection = new TeaCollection(data);   
    this.listenTo(this.teaCollection, 'sort', this.render);

    // what fields to show in the table
    this.displayColumns = [
      'name',
      'origin',
      {property: 'brewTemperatur', type: 'number'}
    ];

    this.table = new Table(); 
    this.table.setUp({
      collection: this.teaCollection,
      columns:  this.displayColumns 
    });

    this.render();
  },

  onClickHead: function(evt) {
    this.teaCollection.updateOrder(evt.currentTarget.dataset.fieldName);
  },

  render: function() {
    var context = {
      columns: this.table.getHeaders(),
      rows: this.table.getRows(),
      sort: this.teaCollection.getSortState()
    };
    var html = this.template(context);
    this.$el.html(html);
  },

});

module.exports = ExampleTableView;
