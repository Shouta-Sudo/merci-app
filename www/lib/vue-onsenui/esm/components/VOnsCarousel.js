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
//
//
//
//

import 'onsenui/esm/elements/ons-carousel';
import { hasOptions, deriveEvents } from '../mixins';

var __script__ = {
  name: 'v-ons-carousel',
  mixins: [hasOptions, deriveEvents],

  props: {
    index: {
      type: Number
    },
    onSwipe: {
      type: Function
    }
  },

  watch: {
    index: function index() {
      if (this.index !== this.$el.getActiveIndex()) {
        this.$el.setActiveIndex(this.index, this.options);
      }
    }
  }
};

var render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('ons-carousel', _vm._g({
    attrs: {
      "initial-index": _vm.index
    },
    domProps: {
      "onSwipe": _vm.onSwipe
    },
    on: {
      "postchange": function postchange($event) {
        if ($event.target !== $event.currentTarget) {
          return null;
        }
        _vm.$emit('update:index', $event.activeIndex);
      }
    }
  }, _vm.unrecognizedListeners), [_c('div', [_vm._t("default")], 2), _vm._v(" "), _c('div')]);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default _Object$assign({}, __script__, __template__);