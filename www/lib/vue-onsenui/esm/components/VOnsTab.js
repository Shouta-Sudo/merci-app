import _Object$assign from 'babel-runtime/core-js/object/assign';
import _extends from 'babel-runtime/helpers/extends';
//
//
//
//
//

import 'onsenui/esm/elements/ons-tab';

var __script__ = {
  name: 'v-ons-tab',
  inject: ['tabbar'],

  props: {
    page: {},
    props: {},
    active: {
      type: Boolean
    }
  },

  methods: {
    action: function action() {
      var runDefault = true;
      this.$emit('click', { preventDefault: function preventDefault() {
          return runDefault = false;
        } });

      if (runDefault) {
        this.tabbar.$el.setActiveTab(this.$el.index, _extends({ reject: false }, this.tabbar.options));
      }
    }
  },

  watch: {
    active: function active() {
      this.$el.setActive(this.active);
    }
  }
};

var render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('ons-tab', {
    attrs: {
      "active": _vm.active
    },
    domProps: {
      "onClick": _vm.action
    }
  });
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default _Object$assign({}, __script__, __template__);