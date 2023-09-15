import _Object$assign from 'babel-runtime/core-js/object/assign';
//
//
//
//
//

import 'onsenui/esm/elements/ons-lazy-repeat';

var __script__ = {
  name: 'v-ons-lazy-repeat',

  props: {
    renderItem: {
      type: Function,
      required: true,
      validator: function validator(value) {
        var component = value(0);
        if (component._isVue && !component._isMounted) {
          component.$destroy();
          return true;
        }
        return false;
      }
    },
    length: {
      type: Number,
      required: true
    },
    calculateItemHeight: {
      type: Function,
      default: undefined
    }
  },

  data: function data() {
    return {
      provider: null
    };
  },


  methods: {
    _setup: function _setup() {
      var _this = this;

      this.provider && this.provider.destroy();

      var delegate = new this.$ons._ons._internal.LazyRepeatDelegate({
        calculateItemHeight: this.calculateItemHeight,
        createItemContent: function createItemContent(i) {
          return _this.renderItem(i).$mount().$el;
        },
        destroyItem: function destroyItem(i, _ref) {
          var element = _ref.element;
          return element.__vue__.$destroy();
        },
        countItems: function countItems() {
          return _this.length;
        }
      }, null);

      this.provider = new this.$ons._ons._internal.LazyRepeatProvider(this.$parent.$el, delegate);
    },
    refresh: function refresh() {
      return this.provider.refresh();
    }
  },

  watch: {
    renderItem: function renderItem() {
      this._setup();
    },
    length: function length() {
      this._setup();
    },
    calculateItemHeight: function calculateItemHeight() {
      this._setup();
    }
  },

  mounted: function mounted() {
    this._setup();
    this.$vnode.context.$on('refresh', this.refresh);
  },
  beforeDestroy: function beforeDestroy() {
    this.$vnode.context.$off('refresh', this.refresh);

    // This will destroy the provider once the rendered element
    // is detached (detachedCallback). Therefore, animations
    // have time to finish before elements start to disappear.
    // It cannot be set earlier in order to prevent accidental
    // destroys if this element is retached by something else.
    this.$el._lazyRepeatProvider = this.provider;
    this.provider = null;
  }
};

var render = function render() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;
  return _c('ons-lazy-repeat');
};
var staticRenderFns = [];
var __template__ = { render: render, staticRenderFns: staticRenderFns };

export default _Object$assign({}, __script__, __template__);