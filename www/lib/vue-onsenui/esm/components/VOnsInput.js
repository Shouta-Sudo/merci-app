import _Object$assign from 'babel-runtime/core-js/object/assign';
//
//
//
//
//
//

/* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
import 'onsenui/esm/elements/ons-input';
import { deriveEvents, modelInput, modifier } from '../mixins';

var __script__ = {
  name: 'v-ons-input',
  mixins: [deriveEvents, modelInput, modifier]
};

var render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('ons-input', _vm._g({
    attrs: {
      "modifier": _vm.normalizedModifier
    }
  }, _vm.unrecognizedListeners), [_vm._t("default")], 2);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default _Object$assign({}, __script__, __template__);