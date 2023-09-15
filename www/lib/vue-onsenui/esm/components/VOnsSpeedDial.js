import _Object$assign from 'babel-runtime/core-js/object/assign';
//
//
//
//
//
//

import 'onsenui/esm/elements/ons-speed-dial';
import { hidable, deriveEvents } from '../mixins';

var __script__ = {
  name: 'v-ons-speed-dial',
  mixins: [deriveEvents, hidable],

  props: {
    open: {
      type: Boolean,
      default: undefined
    }
  },

  methods: {
    action: function action() {
      var runDefault = true;
      this.$emit('click', { preventDefault: function preventDefault() {
          return runDefault = false;
        } });

      if (runDefault) {
        this.$el.toggleItems();
      }
    },
    _shouldUpdate: function _shouldUpdate() {
      return this.open !== undefined && this.open !== this.$el.isOpen();
    },
    _updateToggle: function _updateToggle() {
      this._shouldUpdate() && this.$el[this.open ? 'showItems' : 'hideItems'].call(this.$el);
    }
  },

  watch: {
    open: function open() {
      this._updateToggle();
    }
  },

  mounted: function mounted() {
    var _this = this;

    this.$on(['open', 'close'], function () {
      return _this._shouldUpdate() && _this.$emit('update:open', _this.$el.isOpen());
    });

    this._updateToggle();
  }
};

var render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('ons-speed-dial', {
    domProps: {
      "onClick": _vm.action
    }
  }, [_vm._t("default")], 2);
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default _Object$assign({}, __script__, __template__);