import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import HeatMapLayer from 'ember-leaflet-heatmap-layer/components/ember-leaflet-heatmap-layer';

const { A, run, set } = Ember;
const data = [{lat:24.6408,lng:46.7728,value:1},{lat:50.75,lng:-1.55,value:2},{lat:52.6333,lng:1.75,value:3}];

const properties = A([
  'latField',
  'lngField',
  'maxOpacity',
  'maxValue',
  'minValue',
  'radius',
  'scaleRadius',
  'useLocalExtrema',
  'valueField'
]);

let layer;

moduleForComponent('ember-leaflet-heatmap-layer', 'Integration | Component | ember leaflet heatmap layer', {
  integration: true,

  beforeEach() {
    this.register('component:ember-leaflet-heatmap-layer', HeatMapLayer.extend({
      init() {
        this._super(...arguments);
        layer = this;
      }
    }));
  }
});

test('check data and default options', function(assert) {

  this.set('data', data);

  this.render(hbs`
    {{#leaflet-map lat=25.6586 lng=-80.3568 zoom=4 height="500px"}}
      {{ember-leaflet-heatmap-layer data=data}}
    {{/leaflet-map}}`);

  properties.forEach((prop) => {
    assert.equal(layer.get(prop), layer._layer.cfg[prop], prop);
  });

  run.next(() => {
    A(data).reverse().forEach((point, index) => {
      assert.equal(layer._layer._data[index].latlng.lat, point.lat, `lat: ${point.lat}`);
      assert.equal(layer._layer._data[index].latlng.lng, point.lng, `lng: ${point.lng}`);
      assert.equal(layer._layer._data[index].value, point.value, `value: ${point.value}`);
    });
  });

});

test('custom options', function (assert) {
  this.setProperties({
    latField: 'latitude',
    lngField: 'longitude',
    valueField: 'count',
    maxValue: 8,
    minValue: 1,
    maxOpacity: 1,
    radius: 4,
    scaleRadius: false,
    useLocalExtrema: false
  });

  this.render(hbs`
    {{#leaflet-map lat=25.6586 lng=-80.3568 zoom=4 height="500px"}}
      {{ember-leaflet-heatmap-layer
        latField=latField
        lngField=lngField
        maxOpacity=maxOpacity
        maxValue=maxValue
        minValue=minValue
        radius=radius
        scaleRadius=scaleRadius
        useLocalExtrema=useLocalExtrema
        valueField=valueField
      }}
    {{/leaflet-map}}`);

  assert.ok(true);
  properties.forEach((prop) => {
    assert.equal(this.get(prop), layer._layer.cfg[prop], prop);
  });
});

test('update data', function (assert) {

  this.set('data', data);

  this.render(hbs`
    {{#leaflet-map lat=25.6586 lng=-80.3568 zoom=4 height="500px"}}
      {{ember-leaflet-heatmap-layer data=data}}
    {{/leaflet-map}}`);

  run(() => {
    set(data[0], 'value', 10);

    run.next(() => {
      assert.equal(layer._layer._data[layer._layer._data.length - 1].value, data[0].value);
    });
  })
});

test('add data', function (assert) {
  this.set('data', data);

  this.render(hbs`
    {{#leaflet-map lat=25.6586 lng=-80.3568 zoom=4 height="500px"}}
      {{ember-leaflet-heatmap-layer data=data}}
    {{/leaflet-map}}`);

  run(() => {
    const point = {lat:25.6408,lng:47.7728,value:2};
    data.push(point);

    run.next(() => {
      assert.equal(layer._layer._data[0].latlng.lat, point.lat, `lat: ${point.lat}`);
      assert.equal(layer._layer._data[0].latlng.lng, point.lng, `lng: ${point.lng}`);
      assert.equal(layer._layer._data[0].value, point.value, `value: ${point.value}`);
    });
  });

});

