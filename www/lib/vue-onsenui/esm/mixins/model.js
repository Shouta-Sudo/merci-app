import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _defineProperty from 'babel-runtime/helpers/defineProperty';

var _props, _props2;

/* Private */
var model = {
  prop: 'modelProp',
  event: 'modelEvent'
};

/* Public */

// Generic input
var modelInput = {
  model: model,
  props: (_props = {}, _defineProperty(_props, model.prop, [Number, String]), _defineProperty(_props, model.event, {
    type: String,
    default: 'input'
  }), _props),

  methods: {
    _updateValue: function _updateValue() {
      if (this[model.prop] !== undefined && this.$el.value !== this[model.prop]) {
        this.$el.value = this[model.prop];
      }
    },
    _onModelEvent: function _onModelEvent(event) {
      this.$emit(model.event, event.target.value);
    }
  },

  watch: _defineProperty({}, model.prop, function () {
    this._updateValue();
  }),

  mounted: function mounted() {
    this._updateValue();
    this.$el.addEventListener(this[model.event], this._onModelEvent);
  },
  beforeDestroy: function beforeDestroy() {
    this.$el.removeEventListener(this[model.event], this._onModelEvent);
  }
};

// Checkable inputs
var modelCheckbox = {
  mixins: [modelInput],

  props: (_props2 = {}, _defineProperty(_props2, model.prop, [Array, Boolean]), _defineProperty(_props2, model.event, {
    type: String,
    default: 'change'
  }), _props2),

  methods: {
    _updateValue: function _updateValue() {
      if (this[model.prop] instanceof Array) {
        this.$el.checked = this[model.prop].indexOf(this.$el.value) >= 0;
      } else {
        this.$el.checked = this[model.prop];
      }
    },
    _onModelEvent: function _onModelEvent(event) {
      var _event$target = event.target,
          value = _event$target.value,
          checked = _event$target.checked;

      var newValue = void 0;

      if (this[model.prop] instanceof Array) {
        // Is Array
        var index = this[model.prop].indexOf(value);
        var included = index >= 0;

        if (included && !checked) {
          newValue = [].concat(_toConsumableArray(this[model.prop].slice(0, index)), _toConsumableArray(this[model.prop].slice(index + 1, this[model.prop].length)));
        }

        if (!included && checked) {
          newValue = [].concat(_toConsumableArray(this[model.prop]), [value]);
        }
      } else {
        // Is Boolean
        newValue = checked;
      }

      // Emit if value changed
      newValue !== undefined && this.$emit(model.event, newValue);
    }
  }
};

// Radio input
var modelRadio = {
  mixins: [modelInput],
  props: _defineProperty({}, model.event, {
    type: String,
    default: 'change'
  }),

  methods: {
    _updateValue: function _updateValue() {
      this.$el.checked = this[model.prop] === this.$el.value;
    },
    _onModelEvent: function _onModelEvent(event) {
      var _event$target2 = event.target,
          value = _event$target2.value,
          checked = _event$target2.checked;

      checked && this.$emit(model.event, value);
    }
  }
};

export { modelInput, modelCheckbox, modelRadio };