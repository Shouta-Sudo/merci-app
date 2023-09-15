import _Object$assign from 'babel-runtime/core-js/object/assign';
//
//
//
//
//
//

/* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
import 'onsenui/esm/elements/ons-list-item';
import { deriveEvents, modifier } from '../mixins';

var __script__ = {
  name: 'v-ons-list-item',
  mixins: [deriveEvents, modifier],
  props: {
    expanded: {
      type: Boolean
    }
  },
  methods: {
    onExpansion: function onExpansion() {
      if (this.expanded !== this.$el.expanded) {
        this.$emit('update:expanded', this.$el.expanded);
      }
    }
  },
  watch: {
    expanded: function expanded() {
      var action = this.expanded ? 'show' : 'hide';
      this.$el[action + 'Expansion']();
    }
  }
};

var render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('ons-list-item', _vm._g({
    attrs: {
      "modifier": _vm.normalizedModifier
    },
    on: {
      "expansion": _vm.onExpansion
    }
  }, _vm.unrecognizedListeners), [_vm._t("default")], 2);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default _Object$assign({}, __script__, __template__);