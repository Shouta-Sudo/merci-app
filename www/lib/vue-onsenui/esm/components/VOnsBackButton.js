import _Object$assign from 'babel-runtime/core-js/object/assign';
//
//
//
//
//
//

import 'onsenui/esm/elements/ons-back-button';
import { modifier } from '../mixins';

var __script__ = {
  name: 'v-ons-back-button',
  inject: ['navigator'],
  mixins: [modifier],

  methods: {
    action: function action() {
      var runDefault = true;
      this.$emit('click', { preventDefault: function preventDefault() {
          return runDefault = false;
        } });

      if (runDefault && this.navigator.pageStack.length > 1) {
        this.navigator.popPage();
      }
    }
  }
};

var render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('ons-back-button', {
    domProps: {
      "onClick": _vm.action
    }
  }, [_vm._t("default")], 2);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default _Object$assign({}, __script__, __template__);