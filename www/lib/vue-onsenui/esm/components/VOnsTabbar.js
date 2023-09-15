import _Object$assign from 'babel-runtime/core-js/object/assign';
import _extends from 'babel-runtime/helpers/extends';
import _Object$getOwnPropertyDescriptor from 'babel-runtime/core-js/object/get-own-property-descriptor';
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

import 'onsenui/esm/elements/ons-tabbar';
import { deriveEvents, hasOptions, hidable, selfProvider, modifier } from '../mixins';

var __script__ = {
  name: 'v-ons-tabbar',
  mixins: [deriveEvents, hasOptions, hidable, selfProvider, modifier],

  props: {
    index: {
      type: Number
    },
    tabs: {
      type: Array,
      validator: function validator(value) {
        return value.every(function (tab) {
          return ['icon', 'label', 'page'].some(function (prop) {
            return !!_Object$getOwnPropertyDescriptor(tab, prop);
          });
        });
      }
    },
    onSwipe: {
      type: Function
    },
    tabbarStyle: {
      type: null
    }
  },

  methods: {
    _tabKey: function _tabKey(tab) {
      return tab.key || tab.label || tab.icon;
    }
  },

  watch: {
    index: function index() {
      if (this.index !== this.$el.getActiveTabIndex()) {
        this.$el.setActiveTab(this.index, _extends({ reject: false }, this.options));
      }
    }
  }
};

var render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('ons-tabbar', _vm._g({
    attrs: {
      "activeIndex": _vm.index,
      "modifier": _vm.normalizedModifier
    },
    domProps: {
      "onSwipe": _vm.onSwipe
    },
    on: {
      "prechange": function prechange($event) {
        if ($event.target !== $event.currentTarget) {
          return null;
        }
        _vm.$nextTick(function () {
          return !$event.detail.canceled && _vm.$emit('update:index', $event.index);
        });
      }
    }
  }, _vm.unrecognizedListeners), [_c('div', {
    staticClass: "tabbar__content"
  }, [_c('div', [_vm._t("pages", _vm._l(_vm.tabs, function (tab) {
    return _c(tab.page, _vm._g(_vm._b({
      key: tab.page.key || tab.page.name || _vm._tabKey(tab),
      tag: "component"
    }, 'component', tab.props, false), _vm.unrecognizedListeners));
  }))], 2), _vm._v(" "), _c('div')]), _vm._v(" "), _c('div', {
    staticClass: "tabbar",
    style: _vm.tabbarStyle
  }, [_vm._t("default", _vm._l(_vm.tabs, function (tab) {
    return _c('v-ons-tab', _vm._b({
      key: _vm._tabKey(tab)
    }, 'v-ons-tab', tab, false));
  })), _vm._v(" "), _c('div', {
    staticClass: "tabbar__border"
  })], 2)]);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default _Object$assign({}, __script__, __template__);