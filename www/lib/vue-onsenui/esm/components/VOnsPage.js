import _Object$assign from 'babel-runtime/core-js/object/assign';
//
//
//
//
//
//
//
//
//
//

import 'onsenui/esm/elements/ons-page';
import { deriveEvents, deriveDBB, modifier } from '../mixins';

var __script__ = {
  name: 'v-ons-page',
  mixins: [deriveEvents, deriveDBB, modifier],

  props: {
    infiniteScroll: {
      type: Function
    }
  }
};

var render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('ons-page', _vm._g({
    attrs: {
      "modifier": _vm.normalizedModifier
    },
    domProps: {
      "onInfiniteScroll": _vm.infiniteScroll
    }
  }, _vm.unrecognizedListeners), [_vm._t("default")], 2);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default _Object$assign({}, __script__, __template__);