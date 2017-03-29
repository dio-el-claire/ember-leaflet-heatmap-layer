import Ember from 'ember';
import HeatmapOverlay from 'HeatmapOverlay';
import BaseLayer from 'ember-leaflet/components/base-layer';

const { A, run } = Ember;

export default BaseLayer.extend({

  leafletOptions: [
		'backgroundColor', 'blur', 'gradient', 'latField', 'lngField', 'maxOpacity', 'minOpacity',
    'radius', 'scaleRadius', 'useLocalExtrema', 'valueField', 'maxValue', 'minValue'
	],

	radius: 2,

  maxOpacity: .8,

  scaleRadius: true,

  useLocalExtrema: true,

	latField: 'lat',

  lngField: 'lng',

  valueField: 'value',

  minValue: 0,

  maxValue: 1,

	createLayer() {
    return new HeatmapOverlay(...this.get('requiredOptions'), this.get('options'));
  },

  didCreateLayer() {
    A([this.get('latField'), this.get('lngField'), this.get('valueField')]).forEach((field) => {
      this.addObserver(`data.@each.${field}`, this.updateData);
    });

    this.updateData();
  },

  updateData() {
    run.next(this, () => {
      this._layer.setData({
        data: this.get('data') || [],
        min: this.get('minValue'),
        max: this.get('maxValue')});
    });
  }

});
