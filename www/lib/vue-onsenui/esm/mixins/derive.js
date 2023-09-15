import _Object$keys from 'babel-runtime/core-js/object/keys';
import _extends from 'babel-runtime/helpers/extends';
import { camelize, eventToHandler, handlerToProp } from '../internal/util';

/* Private */
var _setupDBB = function _setupDBB(component) {
  var dbb = 'onDeviceBackButton';
  // Call original handler or parent handler by default
  var handler = component[dbb] || component.$el[dbb] && component.$el[dbb]._callback || function (e) {
    return e.callParentHandler();
  };

  component.$el[dbb] = function (event) {
    var runDefault = true;

    component.$emit(handlerToProp(dbb), _extends({}, event, {
      preventDefault: function preventDefault() {
        return runDefault = false;
      }
    }));

    runDefault && handler(event);
  };

  component._isDBBSetup = true;
};

/* Public */
// Device Back Button Handler
var deriveDBB = {
  mounted: function mounted() {
    _setupDBB(this);
  },


  // Core destroys deviceBackButton handlers on disconnectedCallback.
  // This fixes the behavior for <keep-alive> component.
  activated: function activated() {
    this._isDBBSetup === false && _setupDBB(this);
  },
  deactivated: function deactivated() {
    this._isDBBSetup === true && (this._isDBBSetup = false);
  },
  destroyed: function destroyed() {
    this.$el.onDeviceBackButton && this.$el.onDeviceBackButton.destroy();
  }
};

var deriveEvents = {
  computed: {
    unrecognizedListeners: function unrecognizedListeners() {
      var _this = this;

      var name = camelize('-' + this.$options._componentTag.slice(6));
      return _Object$keys(this.$listeners || {}).filter(function (k) {
        return (_this.$ons.elements[name].events || []).indexOf(k) === -1;
      }).reduce(function (r, k) {
        r[k] = _this.$listeners[k];
        return r;
      }, {});
    }
  },

  mounted: function mounted() {
    var _this2 = this;

    this._handlers = {};

    (this.$el.constructor.events || []).forEach(function (key) {
      _this2._handlers[eventToHandler(key)] = function (event) {
        // Filter events from different components with the same name
        if (event.target === _this2.$el || !/^ons-/i.test(event.target.tagName)) {
          _this2.$emit(key, event);
        }
      };
      _this2.$el.addEventListener(key, _this2._handlers[eventToHandler(key)]);
    });
  },
  beforeDestroy: function beforeDestroy() {
    var _this3 = this;

    _Object$keys(this._handlers).forEach(function (key) {
      _this3.$el.removeEventListener(key, _this3._handlers[key]);
    });
    this._handlers = null;
  }
};

export { deriveDBB, deriveEvents };