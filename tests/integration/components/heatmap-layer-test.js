import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import HeatmapLayer from 'ember-leaflet-heatmap-layer/components/heatmap-layer';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

var layer;

moduleForComponent('heatmap-layer', 'Integration | Component | heatmap layer', {
  integration: true,

  beforeEach() {
    this.register('component:heatmap-layer', HeatmapLayer.extend({
      init() {
        this._super(...arguments);
        layer = this;
      }
    }));
  }
});

test('it renders', function(assert) {
  const done = assert.async()
  this.set('data', [{lat:24.6408,lng:46.7728,count:3},{lat:50.75,lng:-1.55,count:1},{lat:52.6333,lng:1.75,count:1},{lat:48.15,lng:9.4667,count:1}]);

  const props = {
    minValue: 1,
    maxValue: 5,
    valueField: 'count',
    minOpacity: 0.1,
    maxOpacity: 0.9,
    radius: 4
  };

  this.setProperties(props);

  // Template block usage:
  this.render(hbs`
    {{#leaflet-map lat=55.753445 lng=37.620418 zoom=10}}
      {{heatmap-layer
        data=data
        minValue=minValue
        maxValue=maxValue
        valueField=valueField
        minOpacity=minOpacity
        maxOpacity=maxOpacity
        radius=radius
      }}
    {{/leaflet-map}}
  `);

  run.next(() => {
    const leafletHeatmap = layer._layer;
    assert.equal(leafletHeatmap._data.length, 4);

    for (var i in props) {
      if (props.hasOwnProperty(i)) {
        assert.equal(leafletHeatmap.cfg[i], props[i], `${i} equal ${props[i]}`);
      }
    }
    done();
  });


});
