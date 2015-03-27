'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var TeaCollection = require('../collections/tea-collection');
var Table = require('yoga-tables').Table;
var TableTemplate = require('../templates/template.ejs');

var ExampleTableView = Backbone.View.extend({
  el: '.table-container',
  template: _.template(TableTemplate),

  initialize: function() {
    var data = [
      { name: 'Sencha', origin: 'Japan', brewTemperatur: '75' },
      { name: 'Gunpowder', origin: 'China', brewTemperatur: 80 },
      { name: undefined, origin: undefined, brewTemperatur: undefined },
      { name: 'Pu-erh', origin: 'China', brewTemperatur: 100 },
      { name: undefined, origin: undefined, brewTemperatur: undefined },
      { name: 'Genmaicha', origin: 'Japan', brewTemperatur: '90' }
    ];

    // data
    this.teaCollection = new TeaCollection(data);   
    this.listenTo(this.teaCollection, 'sort', this.render);

    var filterOn = ['name'];
    this.teaCollection.filterOn = filterOn;


    // what fields to show in the table
    var displayColumns = [
      'name',
      'origin',
      {property: 'brewTemperatur', type: 'number'}
    ];

    this.table = new Table(); 
    this.table.setUp({
      collection: this.teaCollection,
      columns: displayColumns,
      view: this
    });
    this.render();

    this.listenTo(this.teaCollection, 'all', function(evt) { console.log('evt', evt);});
    this.listenTo(this.teaCollection, 'update:filter', function() { 
      this.render();
      this.$el.find('input[name="filter"]').focus();
    });
  },

  render: function() {
    var context = {
      table: this.table.toJSON()
    };
    var html = this.template(context);
    this.$el.html(html);
  }

});

module.exports = ExampleTableView;
