# ember-leaflet-heatmap-layer

Brings [Heatmap.js](https://www.patrick-wied.at/static/heatmapjs/) functionality into [Ember-Leaflet](http://ember-leaflet.com).

## Installation

```bash
ember install ember-leaflet-heatmap-layer
```

## Usage
```handlebars
{{#leaflet-map lat=lat lng=lng zoom=zoom}}

  {{tile-layer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"}}

  {{google-mutant-heatmap-layer data=data valueField='...' maxValue=... minValue=... }}

{{/leaflet-map}}
```

## Options

* `data` heatmap data in format `[{lat:24.6408,lng:46.7728,value:3}]`
* `minValue` minimal value, default `0`
* `maxValue` maximalValue, default `1`
* `latField` latitude field name, default `lat`
* `lngField` longitude field name, default `lng`
* `valueField` value field name, default `value`
* `blur` The blur factor that will be applied to all datapoints. The higher the blur factor is, the smoother the gradients will be, default 0.85
* `minOpacity` The minimum opacity the lowest value in the heatmap will have (will be overridden if opacity set), default `0`
* `maxOpacity` The maximum opacity the lowest value in the heatmap will have (will be overridden if opacity set), default `0.8`
* `opacity` (optional) A global opacity for the whole heatmap. This overrides maxOpacity and minOpacity if set!
* `backgroundColor` A background color string in form of hexcode, color name, or rgb(a)
* `gradient` An object that represents the gradient (syntax: number string [0,1] : color string), check out the example
* `radius` The radius each datapoint will have (if not specified on the datapoint itself), default `2`.
Radius should be small ONLY if scaleRadius is true (or small radius is intended).
If scaleRadius is false it will be the constant radius used in pixels.
* `scaleRadius` default `true`
* `useLocalExtrema` if set to false the heatmap uses the global maximum for colorization, defalt `true`

### Gradient example

```javascript
var gradient = {
    // enter n keys between 0 and 1 here
    // for gradient color customization
    '.5': 'blue',
    '.8': 'red',
    '.95': 'white'
  }
```

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
