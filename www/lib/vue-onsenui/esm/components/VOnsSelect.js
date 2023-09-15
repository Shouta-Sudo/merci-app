import _Object$assign from 'babel-runtime/core-js/object/assign';
//
//
//
//
//
//
//
//

import 'onsenui/esm/elements/ons-select';
import { modifier } from '../mixins';

var __script__ = {
  name: 'v-ons-select',
  mixins: [modifier],
  model: {
    prop: 'modelProp',
    event: 'modelEvent'
  },
  props: {
    modelProp: [Number, String],
    modelEvent: {
      type: String,
      default: 'input'
    }
  },
  computed: {
    selectedValue: {
      get: function get() {
        return this.modelProp;
      },
      set: function set(val) {
        this.$emit('modelEvent', val);
      }
    }
  }
};

var render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('ons-select', _vm._g({
    attrs: {
      "modifier": _vm.normalizedModifier
    }
  }, _vm.$listeners), [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.selectedValue,
      expression: "selectedValue"
    }],
    on: {
      "change": function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.selectedValue = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }
    }
  }, [_vm._t("default")], 2)]);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default _Object$assign({}, __script__, __template__);