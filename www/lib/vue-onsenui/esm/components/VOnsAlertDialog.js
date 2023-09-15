import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$keys from 'babel-runtime/core-js/object/keys';
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

import 'onsenui/esm/elements/ons-alert-dialog';
import { hidable, hasOptions, dialogCancel, deriveEvents, deriveDBB, portal, modifier } from '../mixins';

var __script__ = {
  name: 'v-ons-alert-dialog',
  mixins: [hidable, hasOptions, dialogCancel, deriveEvents, deriveDBB, portal, modifier],

  props: {
    title: {
      type: String
    },
    footer: {
      type: Object,
      validator: function validator(value) {
        return _Object$keys(value).every(function (key) {
          return value[key] instanceof Function;
        });
      }
    }
  }
};

var render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('ons-alert-dialog', _vm._g({
    attrs: {
      "modifier": _vm.normalizedModifier
    }
  }, _vm.unrecognizedListeners), [_c('div', {
    staticClass: "alert-dialog-title"
  }, [_vm._t("title", [_vm._v(_vm._s(_vm.title))])], 2), _vm._v(" "), _c('div', {
    staticClass: "alert-dialog-content"
  }, [_vm._t("default")], 2), _vm._v(" "), _c('div', {
    staticClass: "alert-dialog-footer"
  }, [_vm._t("footer", _vm._l(_vm.footer, function (handler, key) {
    return _c('ons-alert-dialog-button', {
      key: key,
      on: {
        "click": handler
      }
    }, [_vm._v(_vm._s(key))]);
  }))], 2)]);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default _Object$assign({}, __script__, __template__);