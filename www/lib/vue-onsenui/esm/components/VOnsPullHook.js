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

import 'onsenui/esm/elements/ons-pull-hook';
import { deriveEvents } from '../mixins';

var __script__ = {
  name: 'v-ons-pull-hook',
  mixins: [deriveEvents],

  props: {
    action: {
      type: Function
    },
    onPull: {
      type: Function
    }
  }
};

var render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('ons-pull-hook', _vm._g({
    domProps: {
      "onAction": _vm.action,
      "onPull": _vm.onPull
    }
  }, _vm.unrecognizedListeners), [_vm._t("default")], 2);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default _Object$assign({}, __script__, __template__);