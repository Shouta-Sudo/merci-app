import _Object$keys from 'babel-runtime/core-js/object/keys';
import _typeof from 'babel-runtime/helpers/typeof';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
/* Private */
var _toggleVisibility = function _toggleVisibility() {
  if (typeof this.visible === 'boolean' && this.visible !== this.$el.visible) {
    this.$el[this.visible ? 'show' : 'hide'].call(this.$el, this.normalizedOptions || this.options);
  }
};
var _teleport = function _teleport() {
  if (!this._isDestroyed && (!this.$el.parentNode || this.$el.parentNode !== document.body)) {
    document.body.appendChild(this.$el);
  }
};
var _unmount = function _unmount() {
  var _this = this;

  if (this.$el.visible === true) {
    this.$el.hide().then(function () {
      return _this.$el.remove();
    });
  } else {
    this.$el.remove();
  }
};

/* Public */
// Components that can be shown or hidden
var hidable = {
  props: {
    visible: {
      type: Boolean,
      default: undefined // Avoid casting to false
    }
  },

  watch: {
    visible: function visible() {
      _toggleVisibility.call(this);
    }
  },

  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      return _toggleVisibility.call(_this2);
    });
  },
  activated: function activated() {
    var _this3 = this;

    this.$nextTick(function () {
      return _toggleVisibility.call(_this3);
    });
  }
};

// Components with 'options' property
var hasOptions = {
  props: {
    options: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  }
};

// Provides itself to its descendants
var selfProvider = {
  provide: function provide() {
    return _defineProperty({}, this.$options._componentTag.slice(6), this);
  }
};

// Common event for Dialogs
var dialogCancel = {
  mounted: function mounted() {
    var _this4 = this;

    this.$on('dialog-cancel', function () {
      return _this4.$emit('update:visible', false);
    });
  }
};

// Moves the element to a global position
var portal = {
  mounted: function mounted() {
    _teleport.call(this);
  },
  updated: function updated() {
    _teleport.call(this);
  },
  activated: function activated() {
    _teleport.call(this);
  },
  deactivated: function deactivated() {
    _unmount.call(this);
  },
  beforeDestroy: function beforeDestroy() {
    _unmount.call(this);
  }
};

var modifier = {
  props: {
    modifier: {
      type: [String, Array, Object]
    }
  },

  computed: {
    normalizedModifier: function normalizedModifier() {
      var modifier = this.modifier;

      if (typeof modifier === 'string') {
        return modifier;
      }

      if (Array.isArray(modifier)) {
        return modifier.join(' ');
      }

      if ((typeof modifier === 'undefined' ? 'undefined' : _typeof(modifier)) === 'object') {
        return _Object$keys(modifier).reduce(function (acc, key) {
          return acc + (modifier[key] ? ' ' + key : '');
        }, '').trim();
      }

      return false;
    }
  }
};

export { hidable, hasOptions, selfProvider, dialogCancel, portal, modifier };