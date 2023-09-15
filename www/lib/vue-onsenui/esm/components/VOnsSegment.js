import _Object$assign from 'babel-runtime/core-js/object/assign';
//
//
//
//
//
//

import 'onsenui/esm/elements/ons-segment';
import { deriveEvents } from '../mixins';

var __script__ = {
  name: 'v-ons-segment',
  mixins: [deriveEvents],

  props: {
    index: {
      type: Number
    }
  },

  watch: {
    index: function index() {
      if (this.index !== this.$el.getActiveButtonIndex()) {
        this.$el.setActiveButton(this.index, { reject: false });
      }
    }
  }
};

var render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('ons-segment', {
    attrs: {
      "active-index": _vm.index
    },
    on: {
      "postchange": function postchange($event) {
        if ($event.target !== $event.currentTarget) {
          return null;
        }
        _vm.$emit('update:index', $event.index);
      }
    }
  }, [_vm._t("default")], 2);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default _Object$assign({}, __script__, __template__);